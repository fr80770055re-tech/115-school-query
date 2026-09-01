import pandas as pd
import json
import math

# 1. 設定檔案名稱
excel_file = '115-1學期行事曆(1150828).xlsx'
json_file = 'calendar.json'

# 2. 讀取 Excel 檔案，跳過第一列大標題 (skiprows=1)
# 確保工作表名稱為 '工作表1'，若有修改請對應更改
df = pd.read_excel(excel_file, sheet_name='工作表1', skiprows=1)

calendar_data = []

# 我們想擷取活動的欄位名稱
event_columns = ['教育局', '教務處', '學輔處', '總務處', '幼兒園']

# 3. 逐列處理資料
for index, row in df.iterrows():
    # 取得日期區間，並清除前後多餘空白與換行
    date_str = str(row['日期起訖']).strip() if pd.notna(row['日期起訖']) else ""
    
    # 如果連日期都沒有，代表是空行，直接跳過
    if not date_str:
        continue
        
    # 取得週別（例如 "一", "二"），若是 NaN 則設為空白
    week_str = str(row['週別']).strip() if pd.notna(row['週別']) else ""
    
    # 收集當週所有處室的活動
    weekly_events = []
    for col in event_columns:
        val = row[col]
        # 檢查該欄位是否有資料 (不是 NaN)
        if pd.notna(val):
            # 依據換行符號 \n 將文字拆開，並過濾掉空白行
            lines = [line.strip() for line in str(val).split('\n') if line.strip()]
            weekly_events.extend(lines)
            
    # 整理成字典格式加入列表中
    calendar_data.append({
        "week": week_str,
        "date": date_str,
        "events": weekly_events
    })

# 4. 將結果輸出為 JSON 檔案
with open(json_file, 'w', encoding='utf-8') as f:
    # ensure_ascii=False 確保中文能正常顯示，indent=2 讓排版易讀
    json.dump(calendar_data, f, ensure_ascii=False, indent=2)

print(f"轉換成功！已生成 {json_file}，共處理了 {len(calendar_data)} 筆週次資料。")