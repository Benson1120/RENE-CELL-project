// ==========================================
// 1. 產品資料庫 (Product Database)
// ==========================================
const productsData = [
    // --- 1. 護膚 (Skincare) ---
    {
        id: "S01",
        category: "skincare",
        title: "酵素潔面粉",
        subtitle: "pH5.5 溫和弱酸性，天然酵素煥膚，洗後水潤不緊繃。",
        price: 2580,
        memberPrice: 1980,
        img: "/static/images/Product/photo/E (1).png", // 優化：路徑改為標準斜線
        badge: "回購率冠軍",
        badgeColor: "bg-success",
        details: {
            intro: "採用天然木瓜與大米發酵酵素，結合獨家 Antipollucell 防護科技。能溫和分解老廢角質與深層毛孔髒污，pH5.5 弱酸性配方親膚不刺激，洗後肌膚形成保濕水膜，重現透亮光澤，敏弱肌也能安心使用。",
            ritual: "取約 1g (硬幣大小) 粉末於掌心，加少量水充分搓揉出綿密泡沫。均勻塗抹於全臉並輕柔按摩（可加強 T 字部位），最後用溫水洗淨即可。",
            reviewScore: "4.9",
            reviewCount: "850",
            reviewContent: "粉刺真的變少了！洗完臉完全不會緊繃乾澀，摸起來像水煮蛋一樣滑嫩，用量也很省。",
            reviewer: "新北 林小姐"
        }
    },
    {
        id: "S02",
        category: "skincare",
        title: "水潤去角質面膜",
        subtitle: "溫和低刺激，還原嬰兒般的滑嫩光澤肌。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (3).png",
        badge: "溫和煥膚",
        badgeColor: "bg-info text-dark",
        details: {
            intro: "富含天然纖維素與多種珍貴植萃（如陸地棉、酵母、覆盆莓、乳香樹膠等），專為低刺激去角質設計。能溫和代謝老廢角質，維護角質層健康，同時注入植物營養。使用後肌膚瞬間柔嫩光滑，改善暗沉，呈現透亮光澤。",
            ritual: "每週建議使用 1-2 次。洗臉後取適量避開眼唇，均勻塗抹於全臉。靜待 5-10 分鐘，當面膜約 80% 被肌膚吸收後，使用手指順著紋理溫柔搓揉撕下，再用洗臉海綿清潔殘留物，最後以溫水洗淨。",
            reviewScore: "4.8",
            reviewCount: "365",
            reviewContent: "這是我用過最溫和的去角質！搓出來的屑屑很細緻，洗完臉超級亮，完全不會泛紅刺痛。",
            reviewer: "台北 張小姐"
        }
    },
    {
        id: "S03",
        category: "skincare",
        title: "水潤滋養面膜",
        subtitle: "高濃縮營養修護，瞬間撫平乾燥，打造健康發光肌。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (4).png",
        badge: "急救補水",
        badgeColor: "bg-primary",
        details: {
            intro: "專為乾燥缺水與鬆弛肌膚研發的高濃縮面膜。蘊含熊果素、艾地苯及多種珍稀植萃（如金盞花、覆盆莓、乳香樹膠等），能深入肌底供給滿滿營養。有效舒緩去角質後的肌膚壓力，強化保濕屏障，同時改善暗沉，讓肌膚重現水潤、充滿活力的光澤感。",
            ritual: "作為煥膚保養的第二步（建議於第1劑去角質後使用）。取適量均勻塗抹於全臉，靜待 10-15 分鐘讓精華層層滲透。接著輕柔按摩全臉幫助吸收，最後用洗臉海綿擦拭或以溫水洗淨即可。",
            reviewScore: "4.9",
            reviewCount: "320",
            reviewContent: "搭配1劑一起用效果超驚人！敷完臉超級亮，原本乾乾的地方都喝飽水了，真的像剛做完臉一樣。",
            reviewer: "台北 吳小姐"
        }
    },
    {
        id: "S04",
        category: "skincare",
        title: "水潤去角質滋養面膜套裝",
        subtitle: "居家煥膚 1+1，先淨化後修護，效果加倍。",
        price: 6600,
        memberPrice: 5280,
        img: "/static/images/Product/photo/E (2).png",
        badge: "美容師推薦",
        badgeColor: "bg-purple text-white",
        details: {
            intro: "結合「神奇1劑」的溫和去角質與「神奇2劑」的高濃縮修護，打造完整的居家護膚療程。透過獨家 RENE CELL AGE REVERSE SYSTEM，先掃除老廢角質打開通道，再將熊果素與多種植物精華深層導入。一次完成淨化、提亮、保濕與修護，在家就能享受沙龍級的做臉體驗。",
            ritual: "① 淨化 (第1劑)：洗臉後塗抹避開眼唇，待 5-10 分鐘約八成乾時，輕柔搓除老廢角質並洗淨。\n② 修護 (第2劑)：擦乾臉後立即塗抹第 2 劑，厚敷 10-15 分鐘待營養滲透，按摩吸收或洗淨皆可。",
            reviewScore: "5.0",
            reviewCount: "480",
            reviewContent: "這組真的太強了！用完臉亮到像燈泡一樣，毛孔呼吸的感覺很棒，而且比分開買更划算。",
            reviewer: "台中 廖小姐"
        }
    },
    {
        id: "S05",
        category: "skincare",
        title: "多肽化妝水",
        subtitle: "強力補充肌膚水分，使肌膚潤澤彈嫩。",
        price: 2200,
        memberPrice: 1760,
        img: "/static/images/Product/photo/E (5).png",
        badge: "鎮定保濕",
        badgeColor: "bg-primary",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，能有效修護乾燥肌膚，調節油水平衡。富含多種胜肽複合體與玻尿酸，不僅能快速鎮定舒緩洗臉後的緊繃感，更能深層鎖水，強化肌膚屏障，使後續保養更好吸收。",
            ritual: "洗臉後，直接適量噴灑於全臉及頸部，再輕拍讓肌膚吸收；或是先適量浸溼化妝棉，再如擦拭般輕柔塗抹於全臉及頸部。隨時感到乾燥時亦可補充。",
            reviewScore: "4.8",
            reviewCount: "410",
            reviewContent: "噴霧很細緻，吸收超級快！洗完臉噴一下馬上就不乾了，而且皮膚摸起來很水嫩。",
            reviewer: "台中 林小姐"
        }
    },
    {
        id: "S06",
        category: "skincare",
        title: "透明質酸精華",
        subtitle: "有效促進肌膚深層保水，而使肌膚透嫩，充滿活力。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (6).png",
        badge: "深層保濕",
        badgeColor: "bg-info",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，專為乾燥肌膚設計。蘊含鎖住小水分子的多重玻尿酸（透明質酸）與專利天然抗菌成分，能迅速被肌膚吸收，清爽不黏膩。不僅提供深層水分，更能強效鎖水，強化肌膚修復力與保護膜，防禦外在環境刺激，讓肌膚恢復水潤透亮。",
            ritual: "每日使用2次（早/晚）。建議於使用「多肽化妝水」後，取適量產品，順著肌膚紋理，輕柔均勻塗抹於全臉至吸收。",
            reviewScore: "4.9",
            reviewCount: "280",
            reviewContent: "真的很清爽！擦上去馬上就吸收了，皮膚變得很水，完全不會有黏膩感，妝前用也很服貼。",
            reviewer: "台北 鄭小姐"
        }
    },
    {
        id: "S07",
        category: "skincare",
        title: "維生素C精華",
        subtitle: "高純度穩定維他命C，點亮肌膚的強效營養劑。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (8).png",
        badge: "亮白煥膚",
        badgeColor: "bg-warning text-dark",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，專為暗沉疲憊肌膚設計。含有穩定且高純度的維生素 C，能深入肌底，修復受損並喚醒肌膚本然活力。塗抹時會有獨特的「微熱感」，代表有效成分正在被快速吸收，能從內到外有效修護，提亮膚色並緊緻毛孔，敏感膚質也能安心使用。",
            ritual: "每日使用2次（早/晚）。建議於「透明質酸精華」後使用。取適量產品，順著肌膚紋理，輕柔均勻塗抹於臉部及頸部。\n(※溫馨小提醒：建議置於陰涼處，並且豎立保管)",
            reviewScore: "4.8",
            reviewCount: "350",
            reviewContent: "剛擦上去熱熱的感覺很特別，感覺真的有吃進去！用了一瓶之後臉真的變亮了，氣色好很多。",
            reviewer: "新竹 陳小姐"
        }
    },
    {
        id: "S08",
        category: "skincare",
        title: "滋潤修護精華",
        subtitle: "能夠溫柔滲透至深層肌膚有效滋潤，喚發光彩。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (9).png",
        badge: "水光修護",
        badgeColor: "bg-primary",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，專為乾燥缺水肌膚設計。蘊含「馬魯拉果油 (Marula Oil)」與多種植物性油脂，能溫柔滲透至肌膚深層，提供豐富營養與水分，並在表面形成保濕護膚膜。質地柔和不黏膩，能有效修護受損屏障，讓肌膚由內而外煥發潤澤光彩。",
            ritual: "每日使用2次（早/晚）。建議於「維生素C精華」後使用。取適量順著肌膚紋理均勻塗抹。\n(💡小秘訣：可與底妝產品混合使用，或在素顏時隨時補充，打造自然韓系水光肌。)",
            reviewScore: "4.9",
            reviewCount: "290",
            reviewContent: "這瓶真的超好用！單擦很保濕，混在粉底液裡底妝會變得超級貼，完全不卡粉，整張臉都在發光。",
            reviewer: "台北 許小姐"
        }
    },
    {
        id: "S09",
        category: "skincare",
        title: "多肽霜",
        subtitle: "增進能夠反轉年齡的整體肌膚核心彈力，重現緊緻輪廓。",
        price: 3900,
        memberPrice: 3120,
        img: "/static/images/Product/photo/E (10).png",
        badge: "彈力緊緻",
        badgeColor: "bg-secondary",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，專為鬆弛老化肌膚設計。蘊含革新高濃縮胜肽成分 (Peptide) 與煙醯胺，能被肌膚完全吸收，深入底層修護。不僅提供豐富養分，更能雙重增強「核心彈力」與「底層彈力」，改善皺紋並提亮膚色，在表面形成保濕保護膜，讓肌膚重現彈嫩潤澤。",
            ritual: "每日使用2次（早/晚）。建議於精華液後使用，作為保養的最後一道鎖水程序。取適量產品，順著肌膚紋理，輕柔均勻塗抹於全臉至吸收。",
            reviewScore: "4.9",
            reviewCount: "420",
            reviewContent: "擦完臉真的很彈！吸收很快不會黏膩，感覺臉部線條變緊實了，是會一直回購的抗老乳霜。",
            reviewer: "桃園 蔡小姐"
        }
    },
    {
        id: "S10",
        category: "skincare",
        title: "維生素C三件套裝",
        subtitle: "補水、保濕、鎖水一次到位，打造健康肌底的黃金三角。",
        price: 9400,
        memberPrice: 7520,
        img: "/static/images/Product/photo/E (7).png",
        badge: "入門首選",
        badgeColor: "bg-danger",
        details: {
            intro: "專為渴望簡單高效保養的您設計。集結了 RENE CELL 三大明星單品：【多肽化妝水】開啟肌膚通道並鎮定調理，【透明質酸精華】注入高濃度玻尿酸深層抓水，最後以【多肽霜】在肌膚表層形成彈力鎖水膜。三步完成「補水、保水、鎖水」的完美循環，讓肌膚全天候維持水潤緊緻。",
            ritual: "① 喚醒 (化妝水)：洗臉後噴灑於全臉，輕拍至吸收，調理油水平衡。\n② 注入 (玻尿酸)：取適量精華液均勻塗抹，為肌底注入滿滿水分。\n③ 封存 (多肽霜)：最後薄擦乳霜鎖住營養，並針對紋路處加強按摩拉提。",
            reviewScore: "5.0",
            reviewCount: "620",
            reviewContent: "不知道該買什麼選這組就對了！照著順序擦，皮膚真的變得很穩定，乾燥脫皮都好了，而且光澤感很棒。",
            reviewer: "高雄 林小姐"
        }
    },
    {
        id: "S11",
        category: "skincare",
        title: "保濕修護霜",
        subtitle: "溫柔呵護敏感疲倦肌，有效補水滋潤的溫和保濕霜。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (11).png",
        badge: "敏弱肌救星",
        badgeColor: "bg-success",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，專為敏感與疲倦肌膚設計。添加獨特 Antipollucell 成分，能在肌膚表面形成隱形保護膜，強化防禦力，免受外在環境與空汙刺激。質地溫和親膚，能充分供給養分與水分，有效滋潤肌膚，且使用後清爽不黏膩。",
            ritual: "每日使用2次（早/晚）。建議於精華液及「多肽霜」後使用，作為保養的最後一步或加強修護。取適量產品，順著肌膚紋理，輕柔均勻塗抹於肌膚。",
            reviewScore: "4.8",
            reviewCount: "255",
            reviewContent: "換季過敏泛紅的時候都擦這罐，真的很溫和！保濕度很夠但完全不會悶，擦完皮膚變得很穩定。",
            reviewer: "台北 陳小姐"
        }
    },
    {
        id: "S12",
        category: "skincare",
        title: "滋潤BB霜",
        subtitle: "塗抹瞬間煥發光彩，打造細緻光滑的自然好膚色。",
        price: 2580,
        memberPrice: 1980,
        img: "/static/images/Product/photo/E (12).png",
        badge: "養膚底妝",
        badgeColor: "bg-warning text-dark",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，完美結合保養與底妝。擁有細緻的高遮瑕力，能修飾膚色不均，呈現潔淨明亮的自然光澤。富含多種天然植物性成分（如綠茶水、金盞花等），能有效鎮定並修護受損肌膚，質地柔順服貼，讓肌膚整天維持舒適水潤，展現充滿活力的透亮感。",
            ritual: "建議於基礎保養及「防曬霜」後使用。取適量產品，順著肌膚紋理，輕柔均勻塗抹於全臉。可針對瑕疵處少量多次疊擦，達到更完美的遮瑕效果。",
            reviewScore: "4.9",
            reviewCount: "380",
            reviewContent: "遮瑕力很好但完全不厚重！擦完臉很有光澤，而且整天下來皮膚不會悶悶的，感覺真的有在呼吸。",
            reviewer: "台中 廖小姐"
        }
    },
    {
        id: "S13",
        category: "skincare",
        title: "防曬霜",
        subtitle: "溫和不刺激，長效隔離紫外線，給肌膚最高等級的防護。",
        price: 3300,
        memberPrice: 2640,
        img: "/static/images/Product/photo/E (13).png",
        badge: "頂級防護",
        badgeColor: "bg-danger",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4)，提供最高等級的紫外線防護。能持續 8 小時以上雙重隔離 UVA 及 UVB，全面防禦光老化。質地水潤輕盈，具備優秀附著力，塗抹後不泛白、不黏膩，能在肌膚表面形成溫和保護膜，同時供給肌膚養分，呈現自然光采。",
            ritual: "建議於「保濕修護霜」後使用。取適量產品，順著肌膚紋理，輕柔均勻塗抹於全臉及頸部。長時間戶外活動時，建議每 2-3 小時補擦一次以維持最佳防護效果。",
            reviewScore: "4.9",
            reviewCount: "450",
            reviewContent: "這是我用過最清爽的高係數防曬！完全不會死白，跟乳液一樣好推，後續上妝也不會起屑。",
            reviewer: "新北 葉小姐"
        }
    },

    // --- 2. 高級系列 (Premium) ---
    {
        id: "P01",
        category: "premium",
        title: "Q肌底精華",
        subtitle: "能夠深層高效修護肌膚，使肌膚達到完美無瑕的狀態。",
        price: 6600,
        memberPrice: 5280,
        img: "/static/images/Product/photo/F (1).png",
        badge: "極致修護",
        badgeColor: "bg-dark",
        details: {
            intro: "含有「極微小奈米粒子」，塗抹瞬間能被肌膚快速吸收，不留黏膩感。富含 Phytopolamine-S 成分，有助於舒緩緊張肌膚並強化免疫力。這款 150ml (120+30) 超大容量的優質安瓶，專為強健肌底設計，能補充充足膠原蛋白，有效改善皺紋，並預防肌膚水分流失，維持肌膚保水狀態。",
            ritual: "建議於「多肽化妝水」後，「其他精華液」前使用。取適量依照肌膚紋理，輕柔塗抹於全臉。\n(💡極致效應：Q肌底精華能促進後續保養產品吸收，建議作為精華液步驟的第一道程序。)",
            reviewScore: "5.0",
            reviewCount: "150",
            reviewContent: "這瓶真的很大罐可以用很久！吸收速度超級快，完全不黏，感覺擦完這個之後，後面的保養品都變得更好吸收了。",
            reviewer: "台北 鄭小姐"
        }
    },
    {
        id: "P02",
        category: "premium",
        title: "Q肌底面霜",
        subtitle: "促使底層肌膚充分完整吸收，而使肌膚保水彈嫩。",
        price: 4200,
        memberPrice: 3360,
        img: "/static/images/Product/photo/F (2).png",
        badge: "極速滲透",
        badgeColor: "bg-dark",
        details: {
            intro: "結合獨家逆齡反轉系統 (AGE REVERSE SYSTEM4) 與 EXA PEPTASOME 傳導科技，能將高濃縮有效成分微細化，塗抹瞬間立即感受深層吸收，清爽不黏膩。專為渴望高效保濕的肌膚設計，能持續維持水潤狀態，同時兼具美白與改善皺紋生成的雙重功效，打造完美無瑕的彈力肌底。",
            ritual: "作為保養的最後一步驟。使用基礎保養品後，取適量產品，順著肌膚紋理輕柔均勻塗抹於全臉。\n(💡急救小撇步：針對特別乾燥或急需補水的部位，可以少量多次重複塗抹，效果更佳。)",
            reviewScore: "5.0",
            reviewCount: "180",
            reviewContent: "原本擔心抗老霜會很油，結果這罐吸收速度快到嚇人！完全不黏頭髮，但保濕度又超級好，臉摸起來很有彈性。",
            reviewer: "台中 孫小姐"
        }
    },

    // --- 3. 面膜系列 (Mask) ---
    {
        id: "M01",
        category: "mask",
        title: "活顏噴霧 (Retoc Mask)",
        subtitle: "24小時隨時隨地持久透亮，越噴越緊緻的「液態面膜」。",
        price: 2580,
        memberPrice: 1980,
        img: "/static/images/Product/photo/G (1).png",
        badge: "隨身拉提",
        badgeColor: "bg-info text-dark",
        details: {
            intro: "採用獨家逆齡反轉系統 (AGE REVERSE SYSTEM4) 與 EXA PEPTASOME 滲透技術，這是一款「噴的隱形面膜」。不僅能促進膠原蛋白生成，提高皮膚密度，更含補骨脂酚與多種植萃，能 24 小時緊密貼合肌膚。越噴越能感受肌膚被拉提的緊緻感，同時提供源源不絕的水分與營養，兼具美白與改善皺紋雙重功效。",
            ritual: "彩妝前後均可使用，是定妝與補水神器。距離臉部約 20cm 處，閉上眼睛均勻噴灑於全臉。當肌膚感到乾燥、疲憊或需要光澤感時，可隨時補充，打造全天候的潤澤水光肌。",
            reviewScore: "4.9",
            reviewCount: "560",
            reviewContent: "這瓶真的超神！噴完臉會有一種被「抓緊」的拉提感，而且皮膚亮到像剛敷完面膜一樣，出門在外補妝前噴一下超方便。",
            reviewer: "新北 蔡小姐"
        }
    },

    // --- 4. 特別護理 (Special) ---
    {
        id: "SP01",
        category: "special",
        title: "奇蹟鑽石套組",
        subtitle: "居家微針煥膚療程，4步驟、5天內重現鑽石般璀璨新肌。",
        price: 12800,
        memberPrice: 9800,
        img: "/static/images/Product/photo/H (1).png",
        badge: "鎮店之寶",
        badgeColor: "bg-dark text-white",
        details: {
            intro: "結合「天然鑽石微針」與「寶石修護科技」的頂級居家煥膚系統。透過微細的鑽石結晶 (Diamond Peel) 深入毛孔代謝老廢角質，啟動肌膚再生機制。搭配專屬的寶石精華、滋養霜與修護霜，進行「深層清潔→填滿舒緩→修護→保護」的四階段護理。經臨床證實，能顯著改善角質、細紋、彈力與保濕度，從根本解決肌膚問題。",
            ritual: "本套組為 5 天密集療程：\n● 第 1 天 (煥膚日)：洗臉後使用「鑽石微針霜」按壓全臉 (避開眼周) 5分鐘，**勿洗掉**，直接塗抹精華、滋養霜與修護霜。\n● 第 2-4 天 (修護期)：早晚**僅用清水洗臉** (勿用洗面乳)，並加強塗抹後三道保養程序。\n● 第 5 天：恢復正常洗臉，感受肌膚如鑽石般的光澤。\n(※過程中有微刺感或脫皮屬正常現象)",
            reviewScore: "5.0",
            reviewCount: "880",
            reviewContent: "這組真的太神奇了！雖然第一天有點刺刺的，但忍過之後，第五天洗臉時嚇一跳，皮膚嫩到像嬰兒一樣，陳年的痘疤跟暗沉都淡了超多！",
            reviewer: "台北 孫小姐"
        }
    },
    {
        id: "SP02",
        category: "special",
        title: "119冰潤霜",
        subtitle: "肌膚的急救滅火器！一抹降溫，隨時隨地鎮定泛紅敏感。",
        price: 6600,
        memberPrice: 5280,
        img: "/static/images/Product/photo/H (2).png",
        badge: "急救舒緩",
        badgeColor: "bg-danger",
        details: {
            intro: "專為發出求救訊號 (SOS) 的肌膚設計。針對因紫外線、高溫、運動或壓力而發熱發紅的肌膚，提供立即的冷卻鎮定效果。富含 Rubi Stem 成分與天然保濕因子，塗抹瞬間形成鎖水保護膜，清爽不黏膩。大容量軟管設計，方便攜帶，隨時隨地為肌膚「滅火」降溫。",
            ritual: "一霜多用，全家適用：\n1. 【日常鎖水】：精華液後薄擦全臉，改善皺紋。\n2. 【厚敷急救】：肌膚泛紅不適時，厚敷於患處不需洗掉。\n3. 【晚安面膜】：睡前加量塗抹，整晚持續修護。\n(💡小撇步：冷藏後使用，冰鎮舒緩效果更佳！)",
            reviewScore: "4.9",
            reviewCount: "600",
            reviewContent: "曬後或運動完臉紅紅的時候擦這個超舒服！涼涼的馬上降溫，而且完全不會黏頭髮。",
            reviewer: "高雄 許先生"
        }
    },
    {
        id: "SP03",
        category: "special",
        title: "雪顏淨白霜",
        subtitle: "每日修護美白膚打造完美無瑕的膚色，斷絕黑色素來源。",
        price: 5500,
        memberPrice: 4400,
        img: "/static/images/Product/photo/H (3).png",
        badge: "淡斑美白",
        badgeColor: "bg-primary",
        details: {
            intro: "針對暗沉與斑點肌膚設計的集中美白霜。蘊含高純度積雪草粉末與美白成分，透過「三重修護」機制：1. 淡化既有黑斑與色素沉澱、2. 修護受損肌膚、3. 強化肌膚防禦力預防黑色素生成。能有效改善膚色不均、雀斑與黃褐斑，讓肌膚重現如雪般的淨透光采。",
            ritual: "使用基礎保養品後，取適量產品，輕柔均勻塗抹於全臉。\n(💡加強修護：針對有黃褐斑、斑痕瑕疵或色素沉澱的部位，可以再次塗抹加強效果。)",
            reviewScore: "4.8",
            reviewCount: "330",
            reviewContent: "用了之後，臉上的曬斑真的淡了很多！而且皮膚變得很透亮，不是死白那種，是很健康的亮白感。",
            reviewer: "新竹 彭小姐"
        }
    },
];

// ==========================================
// 2. 渲染產品列表 (橫向滑動版)
// ==========================================
// 宣告一個全域變數來儲存 scroll 的按鈕更新函式
let updateScrollButtons = null;

function renderProducts(filter = 'skincare') {
    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = '';

    const filteredData = filter === 'all'
        ? productsData
        : productsData.filter(item => item.category === filter);

    if (filteredData.length === 0) {
        container.style.justifyContent = 'center';
        container.innerHTML = '<div class="text-center text-muted py-5">此分類暫無商品</div>';
        // 如果沒有商品，隱藏所有箭頭
        if (typeof updateScrollButtons === 'function') updateScrollButtons();
        return;
    } else {
        container.style.justifyContent = 'flex-start';
    }

    filteredData.forEach(product => {
        const badgeHTML = product.badge
            ? `<span class="badge ${product.badgeColor} position-absolute top-0 start-0 m-3">${product.badge}</span>`
            : '';

        const html = `
            <div class="product-item animate-fade-in">
                <div class="card product-card h-100 border-0 shadow-sm">
                    <div class="position-relative">
                        ${badgeHTML}
                        <img src="${product.img}" class="card-img-top object-fit-cover" style="height: 250px;" alt="${product.title}" loading="lazy">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${product.title}</h5>
                        <p class="card-text text-muted small text-truncate">${product.subtitle}</p>
                        <div class="my-3">
                            <span class="text-decoration-line-through text-muted small">原價 $${product.price.toLocaleString()}</span><br>
                            <span class="member-price text-brand fw-bold fs-5"><i class="bi bi-gem"></i> 會員價 $${product.memberPrice.toLocaleString()}</span>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="https://lin.ee/JGR0PKq" class="btn btn-brand rounded-pill px-4" target="_blank" rel="noopener noreferrer">
                            我想購買</a>
                            <button class="btn btn-outline-secondary btn-sm" onclick="openProductModal('${product.id}')">
                                查看成分與評價 <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });

    // 渲染後立即更新按鈕狀態 (取代 MutationObserver)
    if (typeof updateScrollButtons === 'function') {
        // 給一點時間讓圖片佈局確定，雖然有固定寬高但保險起見
        setTimeout(updateScrollButtons, 100);
    }
}

// ==========================================
// 3. 處理產品篩選點擊事件
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化左右滑動按鈕邏輯
    initScrollLogic();

    const activeBtn = document.querySelector('#portfolio-flters button.active');
    const defaultCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'skincare';

    // 初始渲染
    renderProducts(defaultCategory);

    const filterButtons = document.querySelectorAll('#portfolio-flters button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-filter');

            // 每次切換分類時，將容器捲回最左邊，體驗較好
            const container = document.getElementById('product-list');
            if (container) container.scrollLeft = 0;

            renderProducts(category);
        });
    });
});

// ==========================================
// 4. 開啟詳細產品 Modal (優化版)
// ==========================================
function openProductModal(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const modalElement = document.getElementById('dynamicProductModal');
    const modalBody = modalElement.querySelector('.modal-body');

    const contentHTML = `
        <div class="row g-0 h-100">
            <div class="col-lg-5 product-modal-img-col p-4 border-end">
                <div class="position-relative w-100 text-center">
                    <img src="${product.img}" class="product-modal-img rounded-3" alt="${product.title}" loading="lazy">
                    ${product.badge ? `<span class="badge ${product.badgeColor} position-absolute top-0 start-0 shadow-sm fs-6 px-3 py-2">${product.badge}</span>` : ''}
                </div>
            </div>

            <div class="col-lg-7 p-4 p-lg-5">
                <div class="mb-4 border-bottom pb-3">
                    <small class="text-uppercase text-brand fw-bold ls-1">Rene Cell Skin Science</small>
                    <h2 class="fw-bold serif-font my-2">${product.title}</h2>
                    <p class="text-muted lead small">${product.subtitle}</p>
                    
                    <div class="d-flex align-items-end mt-3">
                        <h3 class="text-brand fw-bold mb-0 me-2">$${product.memberPrice.toLocaleString()}</h3>
                        <span class="text-decoration-line-through text-muted small mb-1">原價 $${product.price.toLocaleString()}</span>
                        <span class="badge bg-light text-dark ms-3 border">會員現省 $${(product.price - product.memberPrice).toLocaleString()}</span>
                    </div>
                </div>

                <div class="bg-light-brand p-3 rounded-3 mb-4">
                    <h6 class="fw-bold text-brand mb-2"><i class="bi bi-stars me-2"></i>產品亮點 Check Point</h6>
                    <p class="text-secondary small mb-0 text-justify" style="line-height: 1.6;">
                        ${product.details.intro}
                    </p>
                </div>

                <div class="row g-2 mb-4 text-center">
                    <div class="col-3"><div class="p-2 border rounded-2 bg-white h-100"><i class="bi bi-hexagon text-brand fs-5 mb-1 d-block"></i><span style="font-size: 12px;">深層滲透</span></div></div>
                    <div class="col-3"><div class="p-2 border rounded-2 bg-white h-100"><i class="bi bi-shield-check text-brand fs-5 mb-1 d-block"></i><span style="font-size: 12px;">屏障修護</span></div></div>
                    <div class="col-3"><div class="p-2 border rounded-2 bg-white h-100"><i class="bi bi-droplet text-brand fs-5 mb-1 d-block"></i><span style="font-size: 12px;">油水平衡</span></div></div>
                    <div class="col-3"><div class="p-2 border rounded-2 bg-white h-100"><i class="bi bi-brightness-high text-brand fs-5 mb-1 d-block"></i><span style="font-size: 12px;">提亮光澤</span></div></div>
                </div>

                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <h6 class="fw-bold text-dark small border-bottom pb-1 mb-2">使用方法 How to use</h6>
                        <p class="text-muted small mb-0">${product.details.ritual}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="fw-bold text-dark small border-bottom pb-1 mb-2">用戶好評 Review</h6>
                        <div class="d-flex align-items-center bg-light p-2 rounded">
                            <i class="bi bi-person-circle text-secondary fs-4 me-2"></i>
                            <div class="lh-1">
                                <div class="text-warning small mb-1">★★★★★ ${product.details.reviewScore}</div>
                                <small class="text-secondary fst-italic" style="font-size: 11px;">"${product.details.reviewContent}"</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <a href="https://lin.ee/JGR0PKq" class="btn btn-brand rounded-pill py-2 shadow-sm" target="_blank"><i class="bi bi-cart-plus me-2"></i>立即購買 / 加入經銷</a>
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = contentHTML;

    // 優化：檢查是否已有實例，避免重複建立
    let myModal = bootstrap.Modal.getInstance(modalElement);
    if (!myModal) {
        myModal = new bootstrap.Modal(modalElement);
    }
    myModal.show();
}

// ==========================================
// 5. 左右滑動按鈕控制邏輯 (效能優化版)
// ==========================================
function initScrollLogic() {
    const container = document.getElementById('product-list');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');

    if (!container || !leftBtn || !rightBtn) return;

    const scrollAmount = 340;

    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // 核心更新邏輯
    updateScrollButtons = () => {
        const buffer = 10;

        // 檢查左側
        if (container.scrollLeft <= buffer) {
            leftBtn.style.opacity = '0';
            leftBtn.style.pointerEvents = 'none';
        } else {
            leftBtn.style.opacity = '1';
            leftBtn.style.pointerEvents = 'auto';
        }

        // 檢查右側
        // 注意：scrollWidth 有時會有小數點誤差，或者圖片尚未載入導致寬度不準
        // 這裡做一個簡單的防呆，如果有內容寬度 > 視窗寬度才顯示
        if (container.scrollWidth > container.clientWidth &&
            container.scrollLeft + container.clientWidth < container.scrollWidth - buffer) {
            rightBtn.style.opacity = '1';
            rightBtn.style.pointerEvents = 'auto';
        } else {
            rightBtn.style.opacity = '0';
            rightBtn.style.pointerEvents = 'none';
        }
    };

    // 使用 requestAnimationFrame 優化 scroll 事件 (防抖)
    let ticking = false;
    container.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollButtons();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 視窗大小改變時也要更新
    window.addEventListener('resize', updateScrollButtons);
}

document.addEventListener('DOMContentLoaded', () => {
    // 改為從後端 API 獲取資料
    fetch('/api/products')
        .then(response => response.json())
        .then(productsData => {
            initProducts(productsData);
        })
        .catch(error => console.error('無法載入產品:', error));
});

function initProducts(productsData) {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('#portfolio-flters button');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    // 檢查元素是否存在
    if (!productList) return;

    // 渲染產品函式
    function renderProducts(filter) {
        productList.innerHTML = '';
        
        // 篩選邏輯
        const filteredProducts = (filter === 'all') 
            ? productsData 
            : productsData.filter(product => product.category === filter);

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<div class="text-center w-100 py-5 text-muted">此分類尚無產品</div>';
            return;
        }

        filteredProducts.forEach(product => {
            const col = document.createElement('div');
            // 這裡使用 flex-shrink-0 確保橫向捲動時卡片不縮小
            col.className = 'product-card-wrapper px-2'; 
            col.style.width = "280px"; // 固定卡片寬度
            col.style.flexShrink = "0";

            col.innerHTML = `
                <div class="card border-0 shadow-sm h-100 product-card rounded-4 overflow-hidden" style="cursor: pointer;" data-id="${product.id}">
                    <div class="position-relative overflow-hidden">
                        <img src="${product.img}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-img-overlay d-flex flex-column justify-content-end p-0">
                            <div class="product-overlay p-3 w-100 text-white">
                                <span class="badge bg-white text-brand mb-2">${product.category}</span>
                                <h6 class="fw-bold mb-1">${product.name}</h6>
                                <p class="small mb-0 opacity-75">點擊查看詳情 <i class="bi bi-arrow-right"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(col);

            // 綁定點擊彈窗事件
            col.querySelector('.card').addEventListener('click', () => {
                showProductModal(product);
            });
        });
    }

    // 預設顯示 'skincare' 分類
    renderProducts('skincare');

    // 綁定篩選按鈕
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有 active
            filterButtons.forEach(b => {
                b.classList.remove('btn-active', 'btn-brand');
                b.classList.add('btn-outline-brand');
            });
            // 加入 active
            btn.classList.remove('btn-outline-brand');
            btn.classList.add('btn-active');
            
            const filterValue = btn.getAttribute('data-filter');
            renderProducts(filterValue);
        });
    });

    // 顯示產品詳情 Modal
    function showProductModal(product) {
        const modalEl = document.getElementById('dynamicProductModal');
        const modalBody = modalEl.querySelector('.modal-body');
        const modal = new bootstrap.Modal(modalEl);

        modalBody.innerHTML = `
            <div class="row g-0">
                <div class="col-lg-6 bg-light d-flex align-items-center justify-content-center p-4">
                    <img src="${product.img}" class="img-fluid rounded shadow-sm" style="max-height: 400px;" alt="${product.name}">
                </div>
                <div class="col-lg-6 p-5">
                    <span class="badge bg-light-brand text-brand mb-2 px-3 py-2 rounded-pill">${product.category}</span>
                    <h2 class="fw-bold serif-font mb-3">${product.name}</h2>
                    <h4 class="text-brand fw-bold mb-4">${product.price}</h4>
                    
                    <p class="text-secondary mb-4" style="line-height: 1.8;">
                        ${product.description.replace(/\n/g, '<br>')}
                    </p>

                    <div class="d-grid gap-2">
                        <a href="https://lin.ee/JGR0PKq" target="_blank" class="btn btn-brand rounded-pill py-2">
                            <i class="bi bi-line me-2"></i>立即諮詢購買
                        </a>
                    </div>
                </div>
            </div>
        `;
        modal.show();
    }

    // 左右捲動按鈕邏輯
    if(scrollLeftBtn && scrollRightBtn) {
        // 因為現在是 flex container，所以要改變 product-list 的樣式
        productList.style.display = "flex";
        productList.style.overflowX = "auto";
        productList.style.scrollBehavior = "smooth";
        // 隱藏捲軸
        productList.style.scrollbarWidth = "none"; // Firefox
        
        scrollLeftBtn.addEventListener('click', () => {
            productList.scrollBy({ left: -300, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            productList.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}