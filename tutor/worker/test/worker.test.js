import { test } from "node:test";
import assert from "node:assert/strict";
import { handle, buildMessages } from "../src/index.js";

const env = { CLASS_PASSCODE: "owl123", ALLOWED_ORIGINS: "https://example.github.io", ANTHROPIC_API_KEY: "x" };
const ORIGIN = "https://example.github.io";

function req(body, origin = ORIGIN) {
  return new Request("https://w.dev/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
}

function fakeClient(reply, capture = {}) {
  return () => ({
    beta: {
      messages: {
        create: async (params) => {
          capture.params = params;
          return { stop_reason: "end_turn", content: [{ type: "thinking", thinking: "" }, { type: "text", text: JSON.stringify(reply) }] };
        },
      },
    },
  });
}

const okReply = { reply: "題目在問什麼呢？", choices: ["問總共幾個", "問剩下幾個"], stage: "read", subject: "math" };

test("rejects wrong passcode", async () => {
  const res = await handle(req({ passcode: "no", messages: [{ role: "user", text: "hi" }] }), env, fakeClient(okReply));
  assert.equal(res.status, 401);
});

test("rejects unknown origin", async () => {
  const res = await handle(req({ passcode: "owl123", messages: [{ role: "user", text: "hi" }] }, "https://evil.com"), env, fakeClient(okReply));
  assert.equal(res.status, 403);
});

test("returns structured reply and sends schema, fallback, subject hint", async () => {
  const cap = {};
  const res = await handle(
    req({ passcode: "owl123", subject: "math", messages: [{ role: "user", text: "3/4+1/8 怎麼算" }] }),
    env,
    fakeClient(okReply, cap),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ...okReply, remaining: null });
  assert.equal(cap.params.model, "claude-sonnet-5-5");
  assert.equal(cap.params.fallbacks, "default");
  assert.equal(cap.params.output_config.format.type, "json_schema");
  assert.match(cap.params.messages[0].content[0].text, /科目：數學/);
  assert.equal(cap.params.system[0].cache_control.type, "ephemeral");
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});

test("keeps only the latest image", () => {
  const img = { media_type: "image/jpeg", data: "AAAA" };
  const messages = [];
  for (let i = 0; i < 5; i++) {
    messages.push({ role: "user", text: `題目${i}`, image: img });
    messages.push({ role: "assistant", reply: okReply });
  }
  messages.push({ role: "user", text: "好" });
  const { messages: out } = buildMessages({ messages });
  const images = out.flatMap((m) => (Array.isArray(m.content) ? m.content : [])).filter((b) => b.type === "image");
  assert.equal(images.length, 1);
  assert.equal(out[0].content[0].text, "（這裡原本是孩子先前拍的作業照片。）");
});

test("photo with no text gets a placeholder", () => {
  const { messages } = buildMessages({ messages: [{ role: "user", text: "", image: { media_type: "image/png", data: "AA" } }] });
  assert.equal(messages[0].content.length, 2);
  assert.match(messages[0].content[1].text, /還沒有打字/);
});

test("rejects bad image type and history ending with assistant", () => {
  assert.equal(buildMessages({ messages: [{ role: "user", text: "a", image: { media_type: "text/html", data: "x" } }] }).error, "bad_image");
  assert.equal(buildMessages({ messages: [{ role: "user", text: "a" }, { role: "assistant", reply: okReply }] }).error, "bad_messages");
});

test("refusal becomes a friendly reply", async () => {
  const client = () => ({ beta: { messages: { create: async () => ({ stop_reason: "refusal", content: [] }) } } });
  const res = await handle(req({ passcode: "owl123", messages: [{ role: "user", text: "x" }] }), env, client);
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.stage, "other");
});

function fakeKV() {
  const m = new Map();
  return { get: async (k) => m.get(k) ?? null, put: async (k, v) => { m.set(k, v); }, m };
}

test("daily limit per device", async () => {
  const kv = fakeKV();
  const e = { ...env, USAGE: kv, DAILY_TURNS: "2" };
  const body = { passcode: "owl123", deviceId: "dev-12345678", messages: [{ role: "user", text: "hi" }] };
  const r1 = await (await handle(req(body), e, fakeClient(okReply))).json();
  assert.equal(r1.remaining, 1);
  const r2 = await (await handle(req(body), e, fakeClient(okReply))).json();
  assert.equal(r2.remaining, 0);
  const res3 = await handle(req(body), e, fakeClient(okReply));
  assert.equal(res3.status, 429);
  assert.equal((await res3.json()).error, "daily_limit");
  // 別台裝置不受影響
  const other = await handle(req({ ...body, deviceId: "dev-abcdefgh" }), e, fakeClient(okReply));
  assert.equal(other.status, 200);
});

test("failed upstream call does not use up a turn", async () => {
  const kv = fakeKV();
  const e = { ...env, USAGE: kv };
  const broken = () => ({ beta: { messages: { create: async () => { const err = new Error("x"); err.status = 500; throw err; } } } });
  const res = await handle(req({ passcode: "owl123", deviceId: "dev-12345678", messages: [{ role: "user", text: "hi" }] }), e, broken);
  assert.equal(res.status, 502);
  assert.equal(kv.m.size, 0);
});

test("out of credit returns a clear error", async () => {
  const broke = () => ({ beta: { messages: { create: async () => { const err = new Error('400 {"error":{"message":"Your credit balance is too low to access the Anthropic API."}}'); err.status = 400; throw err; } } } });
  const res = await handle(req({ passcode: "owl123", messages: [{ role: "user", text: "hi" }] }), env, broke);
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "out_of_credit");
});
