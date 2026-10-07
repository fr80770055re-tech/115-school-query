// 小波老師 API：Cloudflare Worker，替前端呼叫 Claude。
// API 金鑰與系統提示只存在這裡，學生的瀏覽器看不到。
//
// POST /chat
//   { passcode, deviceId, subject: "math" | "chinese" | null,
//     messages: [ { role: "user", text, image?: { media_type, data } }
//               | { role: "assistant", reply: { reply, choices, stage, subject } } ] }
// → { reply, choices, stage, subject, remaining }
//
// 每台裝置每天最多問 DAILY_TURNS 輪（預設 40），次數記在 KV（USAGE）。沒有綁 KV 時不限制。

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, REPLY_SCHEMA } from "./prompt.js";

const MAX_MESSAGES = 40;          // 超過就只送最後這幾則
const MAX_TEXT = 600;             // 單則文字上限（字）
const MAX_IMAGE_B64 = 2_000_000;  // 約 1.5 MB 圖片
const KEEP_IMAGES = 1;            // 只附上最新的照片，較早的以文字代替（省錢）
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const SUBJECT_LABEL = { math: "數學", chinese: "國語" };

const FALLBACK_REPLY = {
  reply: "小波老師剛剛沒聽清楚，可以再說一次，或換個方式問問看嗎？",
  choices: [],
  stage: "other",
  subject: "other",
};

export default {
  fetch(request, env) {
    return handle(request, env, () => new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
      // 金鑰沒有綁定工作區時，需要指定要用哪個工作區
      defaultHeaders: env.ANTHROPIC_WORKSPACE_ID ? { "anthropic-workspace-id": env.ANTHROPIC_WORKSPACE_ID } : undefined,
    }));
  },
};

export async function handle(request, env, createClient) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  const url = new URL(request.url);
  if (url.pathname !== "/chat" || request.method !== "POST") {
    return json({ error: "not_found" }, 404, cors);
  }
  if (!cors["Access-Control-Allow-Origin"]) return json({ error: "forbidden_origin" }, 403, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_json" }, 400, cors);
  }

  if (!env.CLASS_PASSCODE || body.passcode !== env.CLASS_PASSCODE) {
    return json({ error: "wrong_passcode" }, 401, cors);
  }

  const built = buildMessages(body);
  if (built.error) return json({ error: built.error }, 400, cors);

  const limit = Number(env.DAILY_TURNS) || 40;
  const key = usageKey(body, request);
  const used = env.USAGE ? Number(await env.USAGE.get(key)) || 0 : 0;
  if (env.USAGE && used >= limit) return json({ error: "daily_limit", remaining: 0 }, 429, cors);

  try {
    const client = createClient();
    const response = await client.beta.messages.create({
      model: env.MODEL || "claude-sonnet-5-5",
      max_tokens: 16000,
      // 系統提示單獨標記快取：不同學生、不同題目的對話都能共用，第一輪也便宜
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: built.messages,
      cache_control: { type: "ephemeral" },
      output_config: {
        effort: env.EFFORT || "high",
        format: { type: "json_schema", schema: REPLY_SCHEMA },
      },
      // 被安全分類器擋下時，由伺服器自動改用合適的備援模型重跑。
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });

    // 用量紀錄：`npx wrangler tail` 可以即時看到每輪用了多少 token
    console.log("usage", JSON.stringify({ model: response.model, ...response.usage }));

    if (response.stop_reason === "refusal") {
      return json({ ...FALLBACK_REPLY, reply: "這個問題小波老師沒辦法回答喔。我們回到作業吧！" }, 200, cors);
    }
    let remaining = null;
    if (env.USAGE) {
      // 只在成功回答後才算一次；KV 免費方案每天可寫 1000 次
      await env.USAGE.put(key, String(used + 1), { expirationTtl: 60 * 60 * 48 });
      remaining = Math.max(0, limit - used - 1);
    }
    return json({ ...parseReply(response), remaining }, 200, cors);
  } catch (err) {
    console.error("claude_error", err?.status, err?.message);
    // 預付額度用完或達到每月花費上限：告訴孩子這個月先到這裡
    if (/credit balance|usage limit|spend limit/i.test(String(err?.message))) {
      return json({ error: "out_of_credit" }, 503, cors);
    }
    const status = err?.status === 429 ? 429 : 502;
    return json({ error: status === 429 ? "busy" : "upstream" }, status, cors);
  }
}

export function buildMessages(body) {
  const raw = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  // 第一則必須是學生說的話
  while (raw.length && raw[0]?.role !== "user") raw.shift();
  if (!raw.length || raw[raw.length - 1].role !== "user") return { error: "bad_messages" };

  const imageIndexes = raw
    .map((m, i) => (m.role === "user" && m.image ? i : -1))
    .filter((i) => i >= 0);
  const keepImages = new Set(imageIndexes.slice(-KEEP_IMAGES));

  const subject = SUBJECT_LABEL[body.subject];
  const messages = [];
  for (let i = 0; i < raw.length; i++) {
    const m = raw[i];
    if (m.role === "assistant") {
      const r = m.reply || {};
      messages.push({
        role: "assistant",
        content: JSON.stringify({
          reply: String(r.reply || ""),
          choices: Array.isArray(r.choices) ? r.choices.map(String) : [],
          stage: r.stage || "other",
          subject: r.subject || "other",
        }),
      });
      continue;
    }
    if (m.role !== "user") return { error: "bad_messages" };

    const content = [];
    if (m.image) {
      const { media_type, data } = m.image;
      if (!IMAGE_TYPES.has(media_type) || typeof data !== "string" || data.length > MAX_IMAGE_B64) {
        return { error: "bad_image" };
      }
      if (keepImages.has(i)) {
        content.push({ type: "image", source: { type: "base64", media_type, data } });
      } else {
        content.push({ type: "text", text: "（這裡原本是孩子先前拍的作業照片。）" });
      }
    }
    let text = String(m.text || "").slice(0, MAX_TEXT).trim();
    if (i === 0 && subject) text = `（孩子選的科目：${subject}）\n${text}`;
    if (!text && m.image) text = "（孩子拍了這張作業照片，還沒有打字。）";
    if (!text) return { error: "bad_messages" };
    content.push({ type: "text", text });
    messages.push({ role: "user", content });
  }
  return { messages };
}

// 以台灣日期＋裝置碼計數；沒有裝置碼時退回用 IP
export function usageKey(body, request) {
  const day = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);
  const id = /^[A-Za-z0-9-]{8,64}$/.test(body.deviceId || "")
    ? body.deviceId
    : "ip-" + (request.headers.get("CF-Connecting-IP") || "unknown");
  return `turns:${day}:${id}`;
}

export function parseReply(response) {
  const text = response.content.find((b) => b.type === "text")?.text;
  try {
    const parsed = JSON.parse(text);
    return {
      reply: String(parsed.reply || FALLBACK_REPLY.reply),
      choices: Array.isArray(parsed.choices) ? parsed.choices.slice(0, 4).map(String) : [],
      stage: parsed.stage || "other",
      subject: parsed.subject || "other",
    };
  } catch {
    return FALLBACK_REPLY;
  }
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = allowed.includes("*") || allowed.includes(origin);
  return ok
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {};
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}
