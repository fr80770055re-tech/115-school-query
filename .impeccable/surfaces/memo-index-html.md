---
version: 1
slug: "memo-index-html"
primary_target: "memo/index.html"
related_targets: []
---

# 行動記事簿（memo/）

Scope: 維護者本人自用的待辦記事頁。Mode: Operate。手機單手、零碎時間使用；資料存 Firebase Realtime Database `memos/{uid}`，Email/密碼登入。

Task: 最上方新增「事由＋時限」；下方依新增時間舊→新條列，每筆顯示事由、時限（含剩幾天／逾期）、新增日期。勾選完成、點選編輯、刪除可復原。

## Direction contract

THESIS: 一本隨身橫線手帳，不是 App 清單。拒絕「白卡片堆疊＋浮動 + 按鈕」的待辦 App 預設。

OWN-WORLD: 冷白筆記紙、淡藍橫線（32px 行距，文字落在線上）、左側朱紅邊線隔出日期欄；字是藍黑墨水（霞鶩文楷寫事由、思源黑體寫介面）；朱紅只代表逾期，赭黃代表今明兩天到期。

STORY: 打開就看到今天日期與待辦數，馬上寫下一件事；往下掃就知道哪件最舊、哪件快到期。

FIRST VIEWPORT: 頂部日期＋待辦/逾期計數；緊接新增欄（事由輸入、時限快選：今天/明天/週五/下週一/選日期、「記下」）；其下即橫線清單，左欄新增日期、右欄事由與時限、行尾圓圈勾選。

FORM: 橫線手帳帳簿（候選 1），seed: code-led-ledger。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
