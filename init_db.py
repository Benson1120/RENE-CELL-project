import os
import shutil  # [新增] 用來搬移檔案的工具
from app import app, db, Product, User
from werkzeug.security import generate_password_hash

# 完整的產品資料
raw_data = [
    # --- 1. 護膚 (Skincare) ---
    {
        "category": "skincare",
        "title": "酵素潔面粉",
        "subtitle": "pH5.5 溫和弱酸性，天然酵素煥膚，洗後水潤不緊繃。",
        "price": 2580,
        "memberPrice": 1980,
        "img": "E (1).png",  # [注意] 這裡我們只寫檔名
        "badge": "回購率冠軍",
        "details": {
            "intro": "採用天然木瓜與大米發酵酵素，結合獨家 Antipollucell 防護科技...",
            "ritual": "取約 1g (硬幣大小) 粉末於掌心...",
            "reviewContent": "粉刺真的變少了！洗完臉完全不會緊繃乾澀...",
        },
    },
    {
        "category": "skincare",
        "title": "水潤去角質面膜",
        "subtitle": "溫和低刺激，還原嬰兒般的滑嫩光澤肌。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (3).png",
        "badge": "溫和煥膚",
        "details": {
            "intro": "富含天然纖維素與多種珍貴植萃...",
            "ritual": "每週建議使用 1-2 次...",
            "reviewContent": "這是我用過最溫和的去角質！",
        },
    },
    {
        "category": "skincare",
        "title": "水潤滋養面膜",
        "subtitle": "高濃縮營養修護，瞬間撫平乾燥，打造健康發光肌。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (4).png",
        "badge": "急救補水",
        "details": {
            "intro": "專為乾燥缺水與鬆弛肌膚研發的高濃縮面膜...",
            "ritual": "作為煥膚保養的第二步...",
            "reviewContent": "搭配1劑一起用效果超驚人！",
        },
    },
    {
        "category": "skincare",
        "title": "水潤去角質滋養面膜套裝",
        "subtitle": "居家煥膚 1+1，先淨化後修護，效果加倍。",
        "price": 6600,
        "memberPrice": 5280,
        "img": "E (2).png",
        "badge": "美容師推薦",
        "details": {
            "intro": "結合「神奇1劑」的溫和去角質與「神奇2劑」的高濃縮修護...",
            "ritual": "① 淨化 (第1劑)... ② 修護 (第2劑)...",
            "reviewContent": "這組真的太強了！用完臉亮到像燈泡一樣。",
        },
    },
    {
        "category": "skincare",
        "title": "多肽化妝水",
        "subtitle": "強力補充肌膚水分，使肌膚潤澤彈嫩。",
        "price": 2200,
        "memberPrice": 1760,
        "img": "E (5).png",
        "badge": "鎮定保濕",
        "details": {
            "intro": "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)...",
            "ritual": "洗臉後，直接適量噴灑於全臉及頸部...",
            "reviewContent": "噴霧很細緻，吸收超級快！",
        },
    },
    {
        "category": "skincare",
        "title": "透明質酸精華",
        "subtitle": "有效促進肌膚深層保水，而使肌膚透嫩，充滿活力。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (6).png",
        "badge": "深層保濕",
        "details": {
            "intro": "蘊含鎖住小水分子的多重玻尿酸...",
            "ritual": "每日使用2次（早/晚）...",
            "reviewContent": "真的很清爽！擦上去馬上就吸收了。",
        },
    },
    {
        "category": "skincare",
        "title": "維生素C精華",
        "subtitle": "高純度穩定維他命C，點亮肌膚的強效營養劑。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (8).png",
        "badge": "亮白煥膚",
        "details": {
            "intro": "含有穩定且高純度的維生素 C...",
            "ritual": "每日使用2次（早/晚）...",
            "reviewContent": "剛擦上去熱熱的感覺很特別，感覺真的有吃進去！",
        },
    },
    {
        "category": "skincare",
        "title": "滋潤修護精華",
        "subtitle": "能夠溫柔滲透至深層肌膚有效滋潤，喚發光彩。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (9).png",
        "badge": "水光修護",
        "details": {
            "intro": "蘊含「馬魯拉果油 (Marula Oil)」與多種植物性油脂...",
            "ritual": "每日使用2次（早/晚）...",
            "reviewContent": "這瓶真的超好用！單擦很保濕。",
        },
    },
    {
        "category": "skincare",
        "title": "多肽霜",
        "subtitle": "增進能夠反轉年齡的整體肌膚核心彈力，重現緊緻輪廓。",
        "price": 3900,
        "memberPrice": 3120,
        "img": "E (10).png",
        "badge": "彈力緊緻",
        "details": {
            "intro": "蘊含革新高濃縮胜肽成分 (Peptide) 與煙醯胺...",
            "ritual": "每日使用2次（早/晚）...",
            "reviewContent": "擦完臉真的很彈！吸收很快不會黏膩。",
        },
    },
    {
        "category": "skincare",
        "title": "維生素C三件套裝",
        "subtitle": "補水、保濕、鎖水一次到位，打造健康肌底的黃金三角。",
        "price": 9400,
        "memberPrice": 7520,
        "img": "E (7).png",
        "badge": "入門首選",
        "details": {
            "intro": "集結了 RENE CELL 三大明星單品...",
            "ritual": "① 喚醒... ② 注入... ③ 封存...",
            "reviewContent": "不知道該買什麼選這組就對了！",
        },
    },
    {
        "category": "skincare",
        "title": "保濕修護霜",
        "subtitle": "溫柔呵護敏感疲倦肌，有效補水滋潤的溫和保濕霜。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (11).png",
        "badge": "敏弱肌救星",
        "details": {
            "intro": "專為敏感與疲倦肌膚設計...",
            "ritual": "每日使用2次（早/晚）...",
            "reviewContent": "換季過敏泛紅的時候都擦這罐，真的很溫和！",
        },
    },
    {
        "category": "skincare",
        "title": "滋潤BB霜",
        "subtitle": "塗抹瞬間煥發光彩，打造細緻光滑的自然好膚色。",
        "price": 2580,
        "memberPrice": 1980,
        "img": "E (12).png",
        "badge": "養膚底妝",
        "details": {
            "intro": "完美結合保養與底妝...",
            "ritual": "建議於基礎保養及「防曬霜」後使用...",
            "reviewContent": "遮瑕力很好但完全不厚重！",
        },
    },
    {
        "category": "skincare",
        "title": "防曬霜",
        "subtitle": "溫和不刺激，長效隔離紫外線，給肌膚最高等級的防護。",
        "price": 3300,
        "memberPrice": 2640,
        "img": "E (13).png",
        "badge": "頂級防護",
        "details": {
            "intro": "提供最高等級的紫外線防護...",
            "ritual": "建議於「保濕修護霜」後使用...",
            "reviewContent": "這是我用過最清爽的高係數防曬！",
        },
    },
    {
        "category": "premium",
        "title": "Q肌底精華",
        "subtitle": "能夠深層高效修護肌膚，使肌膚達到完美無瑕的狀態。",
        "price": 6600,
        "memberPrice": 5280,
        "img": "F (1).png",
        "badge": "極致修護",
        "details": {
            "intro": "含有「極微小奈米粒子」...",
            "ritual": "建議於「多肽化妝水」後...",
            "reviewContent": "這瓶真的很大罐可以用很久！",
        },
    },
    {
        "category": "premium",
        "title": "Q肌底面霜",
        "subtitle": "促使底層肌膚充分完整吸收，而使肌膚保水彈嫩。",
        "price": 4200,
        "memberPrice": 3360,
        "img": "F (2).png",
        "badge": "極速滲透",
        "details": {
            "intro": "能將高濃縮有效成分微細化...",
            "ritual": "作為保養的最後一步驟...",
            "reviewContent": "原本擔心抗老霜會很油，結果這罐吸收速度快到嚇人！",
        },
    },
    {
        "category": "mask",
        "title": "活顏噴霧 (Retoc Mask)",
        "subtitle": "24小時隨時隨地持久透亮，越噴越緊緻的「液態面膜」。",
        "price": 2580,
        "memberPrice": 1980,
        "img": "G (1).png",
        "badge": "隨身拉提",
        "details": {
            "intro": "這是一款「噴的隱形面膜」...",
            "ritual": "彩妝前後均可使用...",
            "reviewContent": "這瓶真的超神！",
        },
    },
    {
        "category": "special",
        "title": "奇蹟鑽石套組",
        "subtitle": "居家微針煥膚療程，4步驟、5天內重現鑽石般璀璨新肌。",
        "price": 12800,
        "memberPrice": 9800,
        "img": "H (1).png",
        "badge": "鎮店之寶",
        "details": {
            "intro": "結合「天然鑽石微針」與「寶石修護科技」...",
            "ritual": "本套組為 5 天密集療程...",
            "reviewContent": "這組真的太神奇了！",
        },
    },
    {
        "category": "special",
        "title": "119冰潤霜",
        "subtitle": "肌膚的急救滅火器！一抹降溫，隨時隨地鎮定泛紅敏感。",
        "price": 6600,
        "memberPrice": 5280,
        "img": "H (2).png",
        "badge": "急救舒緩",
        "details": {
            "intro": "專為發出求救訊號 (SOS) 的肌膚設計...",
            "ritual": "一霜多用，全家適用...",
            "reviewContent": "曬後或運動完臉紅紅的時候擦這個超舒服！",
        },
    },
    {
        "category": "special",
        "title": "雪顏淨白霜",
        "subtitle": "每日修護美白膚打造完美無瑕的膚色，斷絕黑色素來源。",
        "price": 5500,
        "memberPrice": 4400,
        "img": "H (3).png",
        "badge": "淡斑美白",
        "details": {
            "intro": "針對暗沉與斑點肌膚設計...",
            "ritual": "使用基礎保養品後，取適量產品...",
            "reviewContent": "用了之後，臉上的曬斑真的淡了很多！",
        },
    },
]


def format_price(num):
    return f"${num:,}"


def init_db():
    with app.app_context():
        # 1. 重建資料庫
        db.drop_all()
        db.create_all()
        print("✅ 資料庫已重建")

        # 2. 建立預設管理員
        if not User.query.filter_by(email="admin@renecell.life").first():
            admin = User(
                email="admin@renecell.life",
                name="系統管理員",
                password=generate_password_hash("admin123", method="scrypt"),
                is_admin=True,  # [新增] 賦予至高無上的權限！
            )
            db.session.add(admin)
            print("✅ 管理員帳號已建立: admin@renecell.life / admin123")

        # 3. 定義路徑
        base_folder = os.path.join(app.root_path, "static", "images")
        source_folder = os.path.join(
            base_folder, "Product", "photo"
        )  # 來源：深層資料夾

        print(f"📂 正在從 {source_folder} 搬移圖片...")

        # 4. 匯入產品並搬移圖片
        count = 0
        for p in raw_data:
            filename = p["img"]  # 例如 "E (1).png"

            # 建立來源與目標的完整路徑
            src_path = os.path.join(source_folder, filename)
            dst_path = os.path.join(base_folder, filename)

            # 檢查來源圖片是否存在
            if os.path.exists(src_path):
                # 複製檔案到 static/images/ (如果不存的話)
                if not os.path.exists(dst_path):
                    try:
                        shutil.copy(src_path, dst_path)
                        print(f"   -> 成功複製: {filename}")
                    except Exception as e:
                        print(f"   -> 複製失敗 {filename}: {e}")
            else:
                print(f"   ⚠️ 警告: 找不到圖片 {src_path}")

            # 寫入資料庫 (只存檔名，不存路徑)
            new_product = Product(
                name=p["title"],
                subtitle=p["subtitle"],
                category=p["category"],
                price=format_price(p["memberPrice"]),
                original_price=format_price(p["price"]),
                badge_text=p["badge"],
                description=p["details"]["intro"],
                how_to_use=p["details"]["ritual"],
                user_reviews=p["details"]["reviewContent"],
                image=filename,  # 資料庫只存 "E (1).png"
            )
            db.session.add(new_product)
            count += 1

        db.session.commit()
        print(f"🎉 成功匯入 {count} 筆產品資料！")


if __name__ == "__main__":
    init_db()
