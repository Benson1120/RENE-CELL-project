import os
import time
import uuid
import re  # [新增] 用來解析 YouTube 網址
from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# --- 設定配置 ---
app.config["SECRET_KEY"] = "這是一個祕密的鑰匙_請隨意修改"
# 原本是: app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

# --- 請改成下面這兩行 ---
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "db.sqlite"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 設定上傳檔案大小上限 (例如 100MB)，避免塞爆伺服器
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024

# 圖片路徑
UPLOAD_FOLDER = os.path.join("static", "images")
# [新增] 影片路徑
VIDEO_FOLDER = os.path.join("static", "videos")

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["VIDEO_FOLDER"] = VIDEO_FOLDER

# 確保資料夾存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VIDEO_FOLDER, exist_ok=True)

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# --- 資料庫模型 ---


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    # [新增] 管理員權限標記 (預設為 False，只有特定人是 True)
    is_admin = db.Column(db.Boolean, default=False)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    subtitle = db.Column(db.String(200))
    category = db.Column(db.String(50))
    price = db.Column(db.String(50))
    original_price = db.Column(db.String(50))
    badge_text = db.Column(db.String(50))
    description = db.Column(db.Text)
    how_to_use = db.Column(db.Text)
    user_reviews = db.Column(db.Text)
    image = db.Column(db.String(200))


# [新增] 影片資料庫模型
class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    video_type = db.Column(db.String(20))  # 'youtube' 或 'file'
    filename = db.Column(db.String(200))  # YouTube ID 或 檔案名稱


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# --- 輔助函式：解析 YouTube ID ---
def get_youtube_id(url):
    # 支援這兩種格式: youtube.com/watch?v=ID 或 youtu.be/ID
    regex = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(regex, url)
    return match.group(1) if match else None


# --- 路由 ---


@app.route("/")
def index():
    # [診斷模式] 嘗試建立資料庫，如果失敗就把錯誤直接印在網頁上
    try:
        with app.app_context():
            db.create_all()
    except Exception as e:
        # 如果出錯，網頁會直接告訴你是什麼錯！
        return f"<h1>資料庫建立失敗 QAQ</h1><p>錯誤原因：{str(e)}</p>"

    return render_template("index.html", version=int(time.time()))


@app.route("/academy")
def academy():
    return render_template("academy.html")


@app.route("/api/products")
def get_products():
    products = Product.query.all()
    product_list = []
    for p in products:
        product_list.append(
            {
                "id": p.id,
                "name": p.name,
                "subtitle": p.subtitle,
                "category": p.category,
                "price": p.price,
                "original_price": p.original_price,
                "badge_text": p.badge_text,
                "description": p.description,
                "how_to_use": p.how_to_use,
                "user_reviews": p.user_reviews,
                "img": (
                    url_for("static", filename=f"images/{p.image}") if p.image else ""
                ),
            }
        )
    return jsonify(product_list)


# [新增] API 回傳影片資料
@app.route("/api/videos")
def get_videos():
    videos = Video.query.all()
    video_list = []
    for v in videos:
        # 如果是檔案，要產生完整的網址
        video_src = v.filename
        if v.video_type == "file":
            video_src = url_for("static", filename=f"videos/{v.filename}")

        video_list.append(
            {
                "id": v.id,
                "title": v.title,
                "description": v.description,
                "type": v.video_type,
                "src": video_src,  # YouTube ID 或 影片路徑
                "thumb": (
                    f"https://img.youtube.com/vi/{v.filename}/mqdefault.jpg"
                    if v.video_type == "youtube"
                    else url_for("static", filename="images/video_placeholder.jpg")
                ),
            }
        )
    return jsonify(video_list)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = User.query.filter_by(email=email).first()

        # 1. 先檢查帳號密碼對不對
        if not user or not check_password_hash(user.password, password):
            flash("帳號或密碼錯誤")
            return redirect(url_for("login"))

        # 2. [新增] 再檢查是不是管理員
        if not user.is_admin:
            flash("此帳號沒有管理員權限，無法登入後臺")
            return redirect(url_for("login"))

        login_user(user)
        return redirect(url_for("dashboard"))
    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email")
        name = request.form.get("name")
        password = request.form.get("password")
        if User.query.filter_by(email=email).first():
            flash("此 Email 已經註冊過了！")
            return redirect(url_for("register"))
        new_user = User(
            email=email,
            name=name,
            password=generate_password_hash(password, method="scrypt"),
            is_admin=True,
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for("login"))
    return render_template("register.html")


@app.route("/dashboard")
@login_required
def dashboard():
    all_products = Product.query.all()
    all_videos = Video.query.all()  # [新增] 讀取影片
    return render_template(
        "dashboard.html",
        name=current_user.name,
        products=all_products,
        videos=all_videos,
    )


# 產品管理 (保持不變)
@app.route("/manage/product", methods=["POST"])
@login_required
def manage_product():
    # ... (省略，保持原本的程式碼) ...
    # 為了簡潔，這裡請直接複製您原本 manage_product 的完整內容
    p_id = request.form.get("product_id")
    name = request.form.get("name")
    subtitle = request.form.get("subtitle")
    category = request.form.get("category")
    price = request.form.get("price")
    original_price = request.form.get("original_price")
    badge_text = request.form.get("badge_text")
    description = request.form.get("description")
    how_to_use = request.form.get("how_to_use")
    user_reviews = request.form.get("user_reviews")
    file = request.files.get("image")

    if p_id:
        product = Product.query.get(p_id)
        product.name = name
        product.subtitle = subtitle
        product.category = category
        product.price = price
        product.original_price = original_price
        product.badge_text = badge_text
        product.description = description
        product.how_to_use = how_to_use
        product.user_reviews = user_reviews
        if file and file.filename != "":
            filename = f"prod_{uuid.uuid4().hex[:8]}.jpg"
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            product.image = filename
        flash(f"產品 {name} 更新成功！")
    else:
        filename = "default.jpg"
        if file and file.filename != "":
            filename = f"prod_{uuid.uuid4().hex[:8]}.jpg"
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        new_product = Product(
            name=name,
            subtitle=subtitle,
            category=category,
            price=price,
            original_price=original_price,
            badge_text=badge_text,
            description=description,
            how_to_use=how_to_use,
            user_reviews=user_reviews,
            image=filename,
        )
        db.session.add(new_product)
        flash(f"產品 {name} 新增成功！")

    db.session.commit()
    return redirect(url_for("dashboard", tab="products"))


# [新增] 影片管理路由 (新增/編輯)
@app.route("/manage/video", methods=["POST"])
@login_required
def manage_video():
    v_id = request.form.get("video_id")
    title = request.form.get("title")
    description = request.form.get("description")
    video_type = request.form.get("video_type")  # 'youtube' or 'file'

    youtube_url = request.form.get("youtube_url")
    video_file = request.files.get("video_file")

    # 決定儲存的檔名/ID
    filename_to_save = None

    if video_type == "youtube":
        if youtube_url:
            yt_id = get_youtube_id(youtube_url)
            if yt_id:
                filename_to_save = yt_id
            else:
                flash("無效的 YouTube 網址")
                return redirect(url_for("dashboard", tab="videos"))
    elif video_type == "file":
        if video_file and video_file.filename != "":
            # 取得副檔名 (例如 .mp4)
            ext = os.path.splitext(video_file.filename)[1]
            # 產生唯一檔名
            unique_name = f"vid_{uuid.uuid4().hex[:8]}{ext}"
            video_file.save(os.path.join(app.config["VIDEO_FOLDER"], unique_name))
            filename_to_save = unique_name

    if v_id:  # 修改
        video = Video.query.get(v_id)
        video.title = title
        video.description = description
        # 只有當有新的來源時才更新類型和內容
        if filename_to_save:
            video.video_type = video_type
            video.filename = filename_to_save
        flash(f"影片 {title} 更新成功！")
    else:  # 新增
        if not filename_to_save:
            flash("請提供 YouTube 網址或上傳影片檔案")
            return redirect(url_for("dashboard", tab="videos"))

        new_video = Video(
            title=title,
            description=description,
            video_type=video_type,
            filename=filename_to_save,
        )
        db.session.add(new_video)
        flash(f"影片 {title} 新增成功！")

    db.session.commit()
    return redirect(url_for("dashboard", tab="videos"))


# [新增] 刪除影片
@app.route("/delete/video/<int:id>")
@login_required
def delete_video(id):
    video = Video.query.get(id)
    if video:
        # 如果是上傳的檔案，順便刪除硬碟上的檔案 (選用，避免空間浪費)
        if video.video_type == "file":
            try:
                os.remove(os.path.join(app.config["VIDEO_FOLDER"], video.filename))
            except:
                pass  # 檔案如果不存在就忽略

        db.session.delete(video)
        db.session.commit()
        flash("影片已刪除")
    return redirect(url_for("dashboard", tab="videos"))


@app.route("/delete/product/<int:id>")
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        flash("產品已刪除")
    return redirect(url_for("dashboard", tab="products"))


@app.route("/upload_image", methods=["POST"])
@login_required
def upload_image():
    if "image_file" not in request.files:
        flash("沒有選擇檔案")
        return redirect(url_for("dashboard"))
    file = request.files["image_file"]
    target_filename = request.form.get("target_filename")
    if file.filename == "" or not target_filename:
        flash("未選擇檔案或目標不明")
        return redirect(url_for("dashboard"))
    if file:
        if not os.path.exists(app.config["UPLOAD_FOLDER"]):
            os.makedirs(app.config["UPLOAD_FOLDER"])
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], target_filename)
        try:
            file.save(save_path)
            flash(f"圖片更新成功！")
        except Exception as e:
            flash(f"上傳失敗: {e}")
    return redirect(url_for("dashboard", tab="images"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
