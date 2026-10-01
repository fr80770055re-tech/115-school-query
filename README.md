# 115-school-query

桃源國小 115 學年度課後班・社團・行事曆查詢頁（GitHub Pages 靜態網站）。

- `index.html`：家長查詢頁
- `admin.html`：查詢使用情形後台（已讀／未讀統計）
- `shared.css`：兩頁共用的設計 token 與元件，規範見 `DESIGN.md`

## 後台設定（只需做一次）

查詢頁每次顯示學生課表時，會匿名記錄「日期／學生／隨機裝置碼」到 Firebase Realtime Database 的 `studentViews`，同一裝置同一天查看同一位學生只記一次。後台用 Firebase 帳號登入才能讀取。

1. **建立管理者帳號**：Firebase 主控台 → Authentication → Sign-in method → 啟用「電子郵件/密碼」；再到 Users → 新增使用者，設定你的 Email 與密碼。
2. **加入資料庫規則**：Realtime Database → 規則，把 `firebase-rules-studentViews.json` 裡的 `"studentViews": { … }` 整段貼進現有的 `"rules": { … }` 裡（與其他節點並列，不要覆蓋原本的規則），並把 `YOUR_ADMIN_EMAIL` 改成第 1 步的 Email，然後發布。
   - 注意：如果現有規則在最上層寫了 `".read": true` 或 `".write": true`，子節點的限制會失效，任何人都能讀到查看紀錄。請先把最上層的開放權限移到各自需要的節點（例如 `weeklyAfterschoolPhoto`）。
3. 打開 `https://<你的 GitHub Pages 網址>/admin.html`，用第 1 步的帳號登入。

## 更新資料

修改 Excel → 執行 `convert_calendar.py`／`convert_students.py` → 產生 `calendar.json`、`students.json` → 推上 GitHub。
