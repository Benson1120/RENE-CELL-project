// js/auth.js

// 1. 引入 Firebase SDK (使用 CDN 方式，這段會放在 HTML 中，這裡寫邏輯)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Firebase 設定 (請替換成您自己的 Config)
const firebaseConfig = {
  apiKey: "AIzaSyAyH4KSl6NpjUOlpaFyunEMvL3cvrB74rE",
  authDomain: "rene-cell-system.firebaseapp.com",
  projectId: "rene-cell-system",
  storageBucket: "rene-cell-system.firebasestorage.app",
  messagingSenderId: "1096923952028",
  appId: "1:1096923952028:web:fb360b74a6977c6e748e59",
  measurementId: "G-94QN7WK6DV"
};

// 3. 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 4. 處理登入表單提交
const loginForm = document.querySelector('#loginModal form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // 阻止表單預設跳轉

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        try {
            submitBtn.innerHTML = '登入中...';
            submitBtn.disabled = true;

            // 執行 Firebase 登入
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            alert('登入成功！歡迎回來');
            
            // 關閉 Modal
            const modalEl = document.getElementById('loginModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // 重整頁面或跳轉到會員區
            window.location.href = "#member"; 

        } catch (error) {
            console.error(error);
            let msg = "登入失敗，請重試。";
            if (error.code === 'auth/invalid-credential') {
                msg = "帳號或密碼錯誤。";
            }
            alert(msg);
        } finally {
            submitBtn.innerHTML = '登入';
            submitBtn.disabled = false;
        }
    });
}

// 5. 監聽登入狀態改變 (登入後自動切換介面)
onAuthStateChanged(auth, async (user) => {
    const navLoginBtn = document.querySelector('button[data-bs-target="#loginModal"]');
    const memberSection = document.getElementById('member');
    const memberDemoSection = document.getElementById('member-demo'); // 這是原本寫死的區塊

    if (user) {
        // --- 已登入 ---
        console.log("User logged in:", user.uid);

        // 1. 修改導覽列按鈕
        if (navLoginBtn) {
            navLoginBtn.textContent = "登出";
            navLoginBtn.removeAttribute('data-bs-toggle');
            navLoginBtn.removeAttribute('data-bs-target');
            navLoginBtn.onclick = () => logout(); // 綁定登出函式
        }

        // 2. 顯示會員區塊
        if (memberSection) memberSection.style.display = 'block';
        
        // 3. 讀取並填入使用者資料 (從 Firestore)
        await loadUserData(user.uid);

    } else {
        // --- 未登入 ---
        console.log("User logged out");

        // 1. 還原導覽列按鈕
        if (navLoginBtn) {
            navLoginBtn.textContent = "會員登入";
            navLoginBtn.setAttribute('data-bs-toggle', 'modal');
            navLoginBtn.setAttribute('data-bs-target', '#loginModal');
            navLoginBtn.onclick = null;
        }

        // 2. 隱藏會員區塊 (或者顯示請先登入的提示)
        if (memberSection) {
            // memberSection.style.display = 'none'; // 如果您希望沒登入就完全看不到，請取消註解這行
            // 目前為了展示，我們暫時不隱藏，但在真實系統中通常會隱藏
        }
    }
});

// 登出函式
function logout() {
    signOut(auth).then(() => {
        alert('已登出');
        window.location.reload();
    }).catch((error) => {
        console.error(error);
    });
}

// 讀取資料庫資料 (模擬)
async function loadUserData(uid) {
    // 這裡連接 Firestore 資料庫
    // 假設我們在資料庫有一個 users 集合，文件 ID 就是 uid
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        
        // 更新畫面上的文字
        // 假設 HTML 有對應的 ID，例如 <h5 id="user-name">...</h5>
        updateElementText("user-name", data.name);
        updateElementText("user-rank", data.rank);
        updateElementText("user-pv", data.pv);
        updateElementText("user-bonus", `$ ${data.bonus}`);
    } else {
        console.log("No such document! 這是新用戶或資料未建立");
    }
}

// 輔助函式：安全更新文字
function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}