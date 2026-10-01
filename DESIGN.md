---
name: 桃源國小 課後班・社團・行事曆查詢
description: 家長在接送前用手機查孩子今天去向的校園公告欄
colors:
  bulletin-ink-blue: "#35507a"
  bulletin-ink-blue-deep: "#25395a"
  bulletin-ink-blue-wash: "#e7ecf3"
  playground-green: "#4f7a5b"
  playground-green-wash: "#e8f0ea"
  sticky-note-amber: "#8a5a0c"
  sticky-note-wash: "#faf0d9"
  alert-brick: "#a4372a"
  alert-brick-wash: "#f7e9e6"
  board-paper: "#f5f6f4"
  notice-white: "#ffffff"
  pinned-gray: "#f0f1ee"
  pin-line: "#dee0d9"
  pin-line-strong: "#c9ccc2"
  print-ink: "#23241f"
  print-ink-soft: "#5f625a"
  print-ink-faint: "#767a70"
typography:
  display:
    fontFamily: "Noto Serif TC, serif"
    fontSize: "clamp(26px, 5vw, 30px)"
    fontWeight: 700
    lineHeight: 1.3
  headline:
    fontFamily: "Noto Serif TC, serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.4
  title:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.6
  body:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
  tag:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.04em"
  data:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  tag: "5px"
  sm: "8px"
  control: "9px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "28px"
  gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.bulletin-ink-blue}"
    textColor: "{colors.notice-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.bulletin-ink-blue-deep}"
  input-search:
    backgroundColor: "{colors.pinned-gray}"
    textColor: "{colors.print-ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "48px"
  input-search-focus:
    backgroundColor: "{colors.notice-white}"
  notice-card:
    backgroundColor: "{colors.notice-white}"
    rounded: "{rounded.lg}"
    padding: "28px"
  day-card:
    backgroundColor: "{colors.pinned-gray}"
    rounded: "{rounded.md}"
    padding: "16px"
  day-card-today:
    backgroundColor: "{colors.bulletin-ink-blue-wash}"
  chip-club:
    backgroundColor: "{colors.playground-green-wash}"
    textColor: "{colors.playground-green}"
    rounded: "{rounded.pill}"
    padding: "5px 14px"
  chip-choice:
    backgroundColor: "{colors.pinned-gray}"
    textColor: "{colors.print-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  tag-now:
    backgroundColor: "{colors.bulletin-ink-blue}"
    textColor: "{colors.notice-white}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "1px 6px"
  nav-link:
    textColor: "{colors.print-ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  reminder-note:
    backgroundColor: "{colors.sticky-note-wash}"
    textColor: "{colors.print-ink}"
    rounded: "{rounded.md}"
    padding: "13px 16px"
---

# Design System: 桃源國小 課後班・社團・行事曆查詢

## Overview

**Creative North Star: "校門口公告欄"**

這個介面是一面整理得很好的校門口公告欄。灰白的板面上，一張張白色公告整齊釘著，每張只講一件事：這週孩子在哪一班、這週上課的情形、全校接下來的行事。家長走過時一眼就能找到跟自己有關的那張，不需要湊近細讀。

氣質是**沉穩、清楚、溫和**。色彩低彩度，墨藍像正式印刷的公告字，操場綠留給社團，便條紙黃只用在「要注意」的地方。重點靠位置與字重凸顯，不靠裝飾；家長通常在接送前的零碎時間、單手拿手機打開，所以每個元素都要大到好按、少到不必思考。

版面是單欄、手機優先，最寬 720px。層次靠板面與公告的底色深淺堆疊，陰影極淡，只是讓白色公告從灰白板面浮起一點點。

**Key Characteristics:**
- 單欄公告串：標題 → 提醒便條 → 查詢公告 → 本週上課情形 → 行事曆
- 墨藍只標示「主要操作」與「現在」（本週、今天）
- 襯線字只用在頁面與區塊標題，其餘全是黑體
- 大觸控目標（主要控制項 48px 高）、溫和圓角、無裝飾性動畫
- 完整深色模式，隨系統切換

## Colors

低彩度的墨藍、操場綠與便條紙黃，放在帶一點灰綠調的紙白板面上；每個有色彩的地方都代表一種意思。

### Primary
- **公告墨藍** (bulletin-ink-blue)：主要按鈕、鍵盤焦點框、「本週／今天」標記、區塊中的日期強調。深一階的 **公告墨藍・深** 用於按鈕 hover 與目前週次的文字；淡一階的 **公告墨藍・淡** 用於本週列與今天卡片的底色。

### Secondary
- **操場綠** (playground-green)：社團標籤、「參加社團」小標與上傳成功訊息。它的淡色版本是社團標籤底色。

### Tertiary
- **便條紙黃** (sticky-note-amber)：提醒便條的強調字、行事曆中「放假／補假／停課」的事項。它的淡色版本是提醒便條底色。

### Neutral
- **公告板紙白** (board-paper)：整頁底色，像公告板的板面。
- **公告白** (notice-white)：公告卡片表面。
- **釘住灰** (pinned-gray)：卡片內的次一層表面，如每日卡片、輸入框、已結束週次。
- **圖釘線** / **圖釘線・深** (pin-line / pin-line-strong)：卡片外框、分隔線；深一階用於 hover 外框與捲軸。
- **印刷墨黑** (print-ink)：正文。**印刷墨灰** (print-ink-soft) 用於說明文字；**印刷墨淡** (print-ink-faint) 用於欄位名稱、日期、placeholder。
- **警示磚紅** (alert-brick)：查詢失敗與上傳錯誤訊息，搭配其淡色底。

深色模式各 token 另有對應值（例：公告墨藍 `#8fadd6`、板面 `#1a1b17`、印刷墨淡 `#979985`），定義在 `index.html` 的 `:root` 深色區塊中，名稱與角色完全相同。

**The One Meaning Rule.** 每種顏色只代表一種意思：墨藍＝操作與「現在」，綠＝社團與成功，黃＝提醒與放假，紅＝錯誤。不要為了好看把顏色借給別的用途。

**The Tinted Wash Rule.** 狀態強調一律用同色系的淡底加上同色系的字，不用粗色條、不用漸層。

## Typography

**Display Font:** Noto Serif TC（後備 serif）
**Body Font:** Noto Sans TC（後備 system-ui, sans-serif）

**Character:** 襯線標題帶來公告抬頭的正式感，黑體正文確保手機上小字依然清楚。兩者都是 Google Fonts 的思源字族，中文字形一致。

### Hierarchy
- **Display**（700，26–30px，1.3）：只有頁面主標題一處，允許 balance 換行。
- **Headline**（700，20px，1.4）：每個區塊的標題，如「本週各類課後班上課情形一覽」「全校近期行事曆」、查詢結果姓名。
- **Title**（700，15px）：卡片內小標，如「星期一」「參加社團」。
- **Body**（400，15px，1.6）：說明與行事曆事項（行事曆為 14.5px）；說明文字寬度約 40ch。
- **Label**（600，14px）：表單標籤、導覽連結、按鈕。
- **Tag**（700，11px，字距 0.04em）：「本週」「今天」「提醒」小標籤。
- **Data**（13px，等寬數字）：日期、週次區間、更新時間。

**The Serif Is a Headline Rule.** 襯線字只出現在 Display 與 Headline，按鈕、標籤、資料一律黑體。

**The Tabular Dates Rule.** 所有日期與時間使用等寬數字，讓行事曆的日期欄上下對齊。

## Layout

單欄，最寬 720px 置中，左右 20px 留白。頁面由上而下是固定順序的公告串，區塊之間間距 28px；卡片內距 28px（560px 以下縮為 20px）。卡片內元素用 10–16px 的緊密間距分組，不同組之間以一條細分隔線與約 24px 間距分開。

頁面導覽列在捲動時黏在頂端，背景半透明並帶輕微模糊，捲離頂端後才出現底線。

響應式行為是結構性的，不是縮放字級：
- 560px 以下：每日卡片從三欄改為單欄，卡片內改成「星期在左、資料在右」的橫排。
- 520px 以下：行事曆週次列從「左側週次＋右側事項」改為上下排列。
- 420px 以下：查詢列與上傳列的按鈕移到輸入框下方，滿版寬度。

## Elevation & Depth

以平面為主。層次主要靠三層底色：板面（紙白）→ 公告（白）→ 公告內區塊（釘住灰）。卡片用一層極淡的陰影從板面浮起，其他元素一律無陰影。

### Shadow Vocabulary
- **公告浮起** (`box-shadow: 0 1px 2px rgba(35,36,31,0.04), 0 8px 24px -12px rgba(35,36,31,0.12)`)：只用於最外層的公告卡片。深色模式改為較深的黑色透明度。

**The Paper on Board Rule.** 只有最外層公告有陰影；公告裡面的東西靠底色與細線分層，永不疊陰影。

## Shapes

溫和的圓角，由外而內逐層變小：公告卡片 14px、內層卡片與提醒便條 10px、按鈕與輸入框 9px、訊息框 8px、小標籤 5px。可點選的標籤類（社團、姓名選項、導覽連結）使用全圓角膠囊形。外框一律 1px 細線；每日卡片內的欄位以 1px 虛線分隔。

## Components

### Buttons
**大而好按、話不多。**
- **Shape:** 溫和圓角（9px），高度 48px。
- **Primary:** 公告墨藍底、白字、600 字重、左右 24px 內距。一個區塊只有一顆主要按鈕。
- **Hover / Active:** hover 轉為公告墨藍・深；按下時下移 1px。
- **Disabled / Loading:** 55% 不透明，文字改為目前狀態（「載入中…」「上傳中…」）。
- **Toggle row:** 「顯示已結束的 N 週」是滿版的釘住灰按鈕列，hover 轉白。

### Chips
- **社團標籤:** 操場綠淡底、操場綠字、膠囊形，純顯示不可點。沒有社團時改為釘住灰底、淡墨字。
- **姓名選項:** 釘住灰底、細框、40px 高的膠囊按鈕；hover 時外框與底色轉為公告墨藍系。

### Cards / Containers
- **Corner Style:** 14px。
- **Background:** 公告白。
- **Shadow Strategy:** 公告浮起（見 Elevation & Depth）。
- **Border:** 1px 圖釘線。
- **Internal Padding:** 28px，手機 20px。
- **每日卡片:** 釘住灰底、10px 圓角、16px 內距；今天的卡片改為公告墨藍・淡底，並加「今天」標籤。

### Inputs / Fields
- **Style:** 釘住灰底、1px 圖釘線、9px 圓角、48px 高、16px 字（避免 iOS 自動放大）。
- **Focus:** 2px 公告墨藍外框，底色轉為公告白。
- **Error:** 錯誤訊息以警示磚紅淡底框顯示在欄位下方，第一行說明問題，第二行說明怎麼補救。
- **File input:** 選擇檔案按鈕改為白底細框的小按鈕，與整體一致。

### Navigation
頁內導覽是三個置中的膠囊連結（查詢課表・本週上課情形・行事曆），印刷墨灰字、600 字重、36px 高；hover 時轉為釘住灰底、墨黑字。整列黏在頂端。

### 行事曆週次列（Signature Component）
公告欄上最主要的一張表。每週一列，左欄是週次與日期區間，右欄是當週事項；每項事項拆成「日期」與「內容」兩欄，日期欄等寬對齊。本週列為公告墨藍・淡底並加「本週」標籤；已結束的週次預設收起，展開後以釘住灰底、較淡字色顯示。放假類事項以便條紙黃加粗。

### 提醒便條
便條紙黃淡底、10px 圓角，左側一個白底小標籤「提醒」，後接一句話。不使用左側粗色條。

## Do's and Don'ts

### Do:
- **Do** 讓「現在」永遠最醒目：本週、今天一律用公告墨藍・淡底加墨藍標籤。
- **Do** 主要控制項維持至少 48px 高，次要可點元素至少 36–40px。
- **Do** 狀態用同色系淡底＋同色系字表達（提醒、錯誤、社團、今天）。
- **Do** 每個會載入的區塊都要有載入中、空白、錯誤三種狀態，而且文字說明下一步。
- **Do** 新增的顏色與尺寸先定義成 `:root` token，並同時給深色模式對應值。
- **Do** 動態只用來表達狀態變化（150–250ms），並尊重「減少動態效果」設定。

### Don't:
- **Don't** 在卡片、便條或列表項目上加超過 1px 的左側或右側色條。
- **Don't** 在標題上方加小字眉標；學校與學年放在標題下方的說明中。
- **Don't** 在公告卡片裡再疊陰影或再包一層卡片。
- **Don't** 用漸層文字、光暈陰影或裝飾性模糊。
- **Don't** 用 emoji 或 Unicode 符號充當圖示。
- **Don't** 把墨藍用在裝飾或非互動的元素上。
