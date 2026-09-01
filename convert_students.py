import json

# 1. 在這裡輸入各班級的資料 (已完成形近字最終校對與除錯)
classes_info = {
    "monday": [
        {"name": "學力班", "teacher": "李宜庭", "room": "電腦", "students": ["吳練", "顏澎祈", "吳宇寧", "林承妤"]},
        {"name": "數學A班", "teacher": "許丹群", "room": "專科教室", "students": ["柯沐恩", "池家勝", "顏彼得", "謝馨", "王巧萱", "蔡妤婕", "謝薔薇"]},
        {"name": "數學B班", "teacher": "林仲凱", "room": "六忠", "students": ["謝澤韋", "高上騰", "吳晨希", "吳珮慈", "吳芮晞", "顏維娜", "張語桐"]},
        {"name": "數學C班", "teacher": "謝震東", "room": "五忠", "students": ["杜宜恩", "王葦萱", "顏汶媗", "許銳", "王祈", "潘亞夢", "余恩惠"]},
        {"name": "數學D班", "teacher": "謝念錚", "room": "四忠", "students": ["吳太顥", "顏宇森", "顏浩宇", "謝諾伊", "謝里安", "高晨昊"]},
        {"name": "數學E班", "teacher": "曾珮荼", "room": "三忠", "students": ["巴力·拉發亮", "柯旼祁", "江孟澤", "謝丞偉", "柯語柔", "吳祐勳"]},
        {"name": "數學F班", "teacher": "曾珮荼", "room": "二忠", "students": ["何杰睿", "曾吉", "洪昊宇", "顏以樂", "高倫勝", "高瑜均", "杜靚誼", "陳曦", "顏宇晴", "顏維琴", "顏芊芊"]},
        {"name": "課照A班", "teacher": "吳雅玲", "room": "視聽教室", "students": ["吳倢", "吳承緯", "杜銘祐", "潘亞恩", "葉恩", "顏箴", "高晨宇", "陳亮", "王薇綺", "吳迪", "高彥翔", "高彥楷", "顏維綉"]},
        {"name": "課照B班", "teacher": "周雪君", "room": "一忠", "students": ["江恩典", "顏亞諾", "顏辰浩", "嵐葳·伊斯坦段", "江慈欣", "潘亞慕", "高上勻", "高芮艾", "高苡樂"]}
    ],
    "tuesday": [
        {"name": "學力班", "teacher": "謝朝欽", "room": "六忠", "students": ["柯沐恩", "吳練", "王巧萱", "顏澎祈", "吳宇寧", "謝薔薇"]},
        {"name": "英語A班", "teacher": "李宜庭", "room": "五忠", "students": ["杜宜恩", "張語桐", "池家勝", "林承妤", "謝馨", "蔡妤婕"]},
        {"name": "英語B班", "teacher": "林仲凱", "room": "四忠", "students": ["謝澤韋", "吳晨希", "吳珮慈", "吳芮晞", "顏維娜", "顏汶媗", "余恩惠"]},
        {"name": "英語C班", "teacher": "謝念錚", "room": "三忠", "students": ["吳太顥", "吳祐勳", "顏宇森", "顏浩宇", "謝諾伊", "謝里安", "高晨昊"]},
        {"name": "課照C班", "teacher": "吳雅玲", "room": "專科教室", "students": ["吳倢", "吳承緯", "巴力·拉發亮", "杜銘祐", "柯旼祁", "江孟澤", "謝丞偉", "柯語柔", "葉恩", "顏箴", "高晨宇", "陳亮", "王薇綺", "高上騰", "王葦萱", "許銳", "王祈", "潘亞夢", "吳迪", "顏彼得", "高彥翔", "高彥楷", "顏維綉"]}
    ],
    "thursday": [
        {"name": "學力班", "teacher": "許丹群", "room": "六忠", "students": ["柯沐恩", "吳練", "王巧萱", "顏澎祈", "吳宇寧", "謝薔薇", "林承妤"]},
        {"name": "國語A班", "teacher": "李宜庭", "room": "五忠", "students": ["顏維娜", "張語桐", "王葦萱", "余恩惠", "池家勝", "謝馨", "蔡妤婕"]},
        {"name": "國語B班", "teacher": "謝震東", "room": "四忠", "students": ["吳太顥", "顏宇森", "顏浩宇", "謝諾伊", "謝里安", "高晨昊"]},
        {"name": "國語C班", "teacher": "謝念錚", "room": "三忠", "students": ["巴力·拉發亮", "杜銘祐", "江孟澤", "謝丞偉", "顏箴", "吳祐勳"]},
        {"name": "國語D班", "teacher": "曾珮荼", "room": "二忠", "students": ["何杰睿", "曾吉", "洪昊宇", "顏以樂", "高倫勝", "高瑜均", "杜靚誼", "陳曦", "顏宇晴", "顏維琴", "顏芊芊"]},
        {"name": "課照D班", "teacher": "林仲凱", "room": "專科教室", "students": ["吳倢", "吳承緯", "柯旼祁", "潘亞恩", "柯語柔", "葉恩", "高晨宇", "陳亮", "王薇綺", "謝澤韋", "高上騰", "吳晨希", "吳珮慈", "吳芮晞", "顏汶媗", "許銳", "王祈", "潘亞夢", "吳迪", "顏彼得", "高彥翔", "高彥楷", "顏維綉"]},
        {"name": "課照E班", "teacher": "周雪君", "room": "一忠", "students": ["江恩典", "顏亞諾", "顏辰浩", "嵐葳·伊斯坦段", "江慈欣", "潘亞慕", "高上勻", "高芮艾", "高苡樂"]}
    ]
}

# 2. 自動將「班級視角」轉換為「學生視角」
student_schedules = {}

for day, classes in classes_info.items():
    for cls in classes:
        for student in cls["students"]:
            if student not in student_schedules:
                # 建立該學生的初始空白課表
                student_schedules[student] = {
                    "monday": {},
                    "tuesday": {},
                    "thursday": {}
                }
            # 填入對應星期的課程資料
            student_schedules[student][day] = {
                "class_name": cls["name"],
                "teacher": cls["teacher"],
                "classroom": cls["room"]
            }

# 3. 整理成前端需要的陣列格式
final_json = []
for name, schedule in student_schedules.items():
    final_json.append({
        "name": name,
        "schedule": schedule
    })

# 4. 輸出檔案
with open('students.json', 'w', encoding='utf-8') as f:
    json.dump(final_json, f, ensure_ascii=False, indent=2)

print(f"轉換成功！已生成 students.json，共處理了 {len(final_json)} 位學生的資料。")