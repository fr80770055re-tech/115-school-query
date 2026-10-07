# 115-school-query

桃源國小 115 學年度課後班・社團・行事曆查詢頁（GitHub Pages 靜態網站）。

- `index.html`：家長查詢頁
- `admin.html`：查詢使用情形後台（已讀／未讀統計）
- `shared.css`：兩頁共用的設計 token 與元件，規範見 `DESIGN.md`
- `memo/`：個人自用的行動記事簿（與查詢頁無關，需登入才看得到資料）
- `tutor/`：貓頭鷹老師，給學生用的作業引導聊天機器人（拍照問題、不直接給答案）。部署方式見 `tutor/README.md`

## 後台設定（只需做一次）

查詢頁每次顯示學生課表時，會匿名記錄「日期／學生／隨機裝置碼」到 Firebase Realtime Database 的 `studentViews`，同一裝置同一天查看同一位學生只記一次。後台用 Firebase 帳號登入才能讀取。

1. **建立管理者帳號**：Firebase 主控台 → Authentication → Sign-in method → 啟用「電子郵件/密碼」；再到 Users → 新增使用者，設定你的 Email 與密碼。
2. **加入資料庫規則**：Realtime Database → 規則，把 `firebase-rules-studentViews.json` 裡的 `"studentViews": { … }` 整段貼進現有的 `"rules": { … }` 裡（與其他節點並列，不要覆蓋原本的規則），並把 `YOUR_ADMIN_EMAIL` 改成第 1 步的 Email，然後發布。
   - 注意：如果現有規則在最上層寫了 `".read": true` 或 `".write": true`，子節點的限制會失效，任何人都能讀到查看紀錄。請先把最上層的開放權限移到各自需要的節點（例如 `weeklyAfterschoolPhoto`）。
3. 打開 `https://<你的 GitHub Pages 網址>/admin.html`，用第 1 步的帳號登入。

## 更新資料

修改 Excel → 執行 `convert_calendar.py`／`convert_students.py` → 產生 `calendar.json`、`students.json` → 推上 GitHub。

## 行動記事簿 memo/（只需設定一次）

網址：`https://<你的 GitHub Pages 網址>/memo/`。記事存在同一個 Firebase 專案的 `memos/{使用者 uid}`，只有登入的本人讀寫得到。

1. **帳號**：沿用後台的「電子郵件/密碼」帳號即可（沒有的話照上方第 1 步新增）。
2. **加入資料庫規則**：Realtime Database → 規則，把 `memo/firebase-rules-memos.json` 裡的 `"memos": { … }` 整段貼進現有的 `"rules": { … }`，與其他節點並列，然後發布。同樣注意最上層不能有 `".read": true`／`".write": true`。
3. **加到主畫面**：iPhone 用 Safari 開啟網址 → 分享 → 「加入主畫面」，之後就像 App 一樣開啟（第一次開要登入一次）。

想先看外觀可以開 `memo/?demo`：用示範資料，不會連到資料庫，重新整理就還原。
