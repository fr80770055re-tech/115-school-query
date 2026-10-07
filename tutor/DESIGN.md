---
name: 小波老師
description: 山上小學教室的一面黑板，小波老師一次只在黑板上寫一個問題
colors:
  board: "#2c4536"
  board-deep: "#223829"
  chalk: "#f3f1e7"
  chalk-dim: "rgba(243, 241, 231, 0.72)"
  chalk-faint: "rgba(243, 241, 231, 0.28)"
  chalk-yellow: "#f2d36b"
  chalk-coral: "#f4a690"
  chalk-green: "#acd9a6"
  wood: "#8a5a34"
  wood-light: "#a8733f"
  wood-deep: "#5b391f"
  paper: "#fbf8ef"
  kraft: "#e6d1a8"
  ink: "#22303a"
  ink-faint: "#66717a"
  magnet-red: "#d4513f"
  magnet-blue: "#3f6fb5"
  magnet-yellow: "#e7b522"
  wall: "#e9ebe1"
  wall-skirt: "#7ea58a"
typography:
  title:
    fontFamily: "LXGW WenKai TC, BiauKai, DFKai-SB, serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
  say:
    fontFamily: "LXGW WenKai TC, BiauKai, DFKai-SB, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.75
  slip:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.6
  card:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.4
  step:
    fontFamily: "LXGW WenKai TC, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  tag:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  paper: "3px"
  control: "16px"
  pill: "999px"
spacing:
  gutter: "16px"
  stack: "22px"
  tray: "14px"
components:
  card-choice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.card}"
    rounded: "{rounded.paper}"
    padding: "10px 18px 8px"
    height: "50px"
  tag-helper:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.wood-deep}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-camera:
    backgroundColor: "{colors.chalk-yellow}"
    textColor: "{colors.board-deep}"
    rounded: "{rounded.control}"
    height: "56px"
  button-send:
    backgroundColor: "{colors.board-deep}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.control}"
    height: "56px"
  input-slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    height: "56px"
---

# 小波老師：設計系統

只適用 `tutor/`。查詢頁和記事簿用的是根目錄的 `DESIGN.md`，兩套規範互不沿用。

## Overview

整個畫面是山上小學教室裡的一面黑板。小波老師把問題用粉筆直接寫在板上；孩子的回答是用磁鐵釘上去的紙條；下緣的木頭粉筆槽放著可以直接點的選項。舊的粉筆字會變淡，所以孩子眼前永遠只有一個要回答的問題。

使用情境：國小學生在課後班的平板或家裡的手機上寫作業，室內燈光下。黑板本來就是深色，所以固定採用深色板面，不跟隨系統的深淺色模式。

## Colors

### Primary
- **黑板綠** `board`：整個工作區的底色，上面疊一層細微的粉筆灰顆粒，再加兩塊擦拭過的淡痕。
- **粉筆白** `chalk`：老師的話。

### Secondary
- **木框** `wood` 系列：桌面版的黑板框，以及所有寬度底部的粉筆槽。
- **紙條** `paper` 與 **牛皮紙** `kraft`：孩子的話、選項卡、輸入框都是紙；固定按鈕是牛皮紙標籤。

### Neutral
- `ink`：紙上的字。`chalk-dim`：舊的粉筆字與次要說明。`chalk-faint`：只用在虛線、分隔線，不用在文字上。

### Named Rules
**粉筆四色規則。** 粉筆只有四色，意思固定，不能拿來裝飾：白色是老師的話，黃色是關鍵（目前步驟、選項磁鐵、相機），珊瑚色是要再看一次的地方（錯誤、連線問題、麥克風收音中），淡綠是已完成的步驟。
**磁鐵三色。** 紅、藍、黃三色磁鐵只用來釘紙條與照片，輪流出現。

## Typography

老師說的話、標題、步驟都用霞鶩文楷，接近課本的楷書，也像黑板上的手寫字。孩子寫的紙條、選項卡、按鈕用思源黑體，看起來像印好的紙。

### Hierarchy
- **title** 24px 粗：板面頂端的「小波老師」。
- **say / slip** 20px：對話只用這一種字級；層級靠粗細與粉筆顏色，不靠字級大小。
- **card** 18px 粗：選項磁鐵卡。
- **step / tag** 15～16px：步驟列與牛皮紙標籤。

### Named Rules
**一種對話字級。** 老師與孩子的話一律 20px，不另外放大縮小。

## Layout

- 手機：黑板滿版；頂端是小波與標題，接著是步驟列和對話區，最下面是粉筆槽（選項 → 固定標籤 → 相機、紙條輸入框、麥克風、送出）。
- 寬度 ≥720px：黑板置中，最寬 780px，四周有 14px 木框，背後是上白下綠的教室牆裙。
- 老師的話靠左，左邊留 34px 放小波；孩子的紙條靠右，最寬 82%。照片紙條最寬 300px。
- 段落之間間距 22px；左右留白 16px。
- 寬度 ≤480px 時，送出鈕只剩箭頭圖示，步驟列的字縮成 15px。

## Elevation & Depth

紙條和磁鐵是唯一浮在板面上的東西。陰影一律有向下的位移和柔和的模糊，不用零位移的光暈，也不用沒有模糊的硬陰影。

### Shadow Vocabulary
- `--slip-shadow`：`0 1px 1px rgba(10,20,14,.25), 0 6px 14px -6px rgba(10,20,14,.55)`。紙條、選項卡、輸入框都用這個。
- `--magnet-shadow`：`0 1px 1px rgba(0,0,0,.35), 0 3px 5px -1px rgba(0,0,0,.4)`。磁鐵專用。

## Shapes

紙張只有 3px 的小圓角，並且微微傾斜（±0.4°～0.9°），像隨手貼上去的；被點到或滑過時會轉正。按鈕類（相機、送出）是 16px 圓角；牛皮紙標籤、念給我聽是膠囊形。

## Components

### Buttons
- **相機**：黃色粉筆色，畫面上最醒目的動作。
- **送出**：深黑板綠底、粉筆字。
- **板擦（換一題）**：板面右上角的板擦圖，按下時板擦掃過黑板，把字擦掉。

### Chips
- **選項磁鐵卡**：白紙、黃磁鐵、粗體字，放在粉筆槽上。
- **固定標籤**：「我不懂／再給我提示／我算出來了」，牛皮紙膠囊。
- **完成卡**：淡綠紙，「拍下一題」。

### Cards / Containers
板面上不用卡片容器。老師的話直接寫在板上，沒有泡泡。

### Inputs / Fields
輸入框是一張紙條，游標是紅色；班級密碼的輸入框也是紙條。

### Navigation
步驟列「看懂題目 → 想方法 → 動手做 → 檢查」用粉筆寫在板面上方：目前的步驟是黃色並畫上波浪底線，完成的步驟是淡綠色加勾。

### 粉筆書寫
新的問題會由左至右一個字一個字寫出來，每字間隔 26ms，最多算到第 70 字。系統設定「減少動態效果」時，直接整段顯示。

### 小波
小波是內嵌的 SVG 粉筆畫：紅色圓臉、頭頂圓圈天線、肚子上有灰色螢幕；外框用粉筆顆粒濾鏡做出筆觸。只在最新那一則老師的話旁邊出現。

## Do's and Don'ts

- **Do** 讓孩子眼前只有一個問題：舊的老師字變淡，小波只陪在最新那一則旁邊。
- **Do** 所有圖示都用同一套 2px 線條的 SVG。
- **Don't** 用 emoji 當圖示。
- **Don't** 在板面上加聊天泡泡或白色卡片。
- **Don't** 把粉筆四色拿來裝飾。
- **Don't** 使用族群文化圖紋；在地元素只用山林自然環境。
