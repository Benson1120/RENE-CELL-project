/**
 * js/script.js
 * 網站全域邏輯控制 (Global Logic)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. 初始化商品篩選功能 (如果頁面上有篩選器的話)
    initProductFilters();

    // 2. 初始化首頁文章區塊 (如果函式已載入)
    initHomeArticles();

});

// ==========================================
// 核心功能定義
// ==========================================

/**
 * 初始化商品篩選邏輯
 * 適用於靜態 HTML 結構的篩選
 */
function initProductFilters() {
    const filterButtons = document.querySelectorAll('#portfolio-flters button');
    const productItems = document.querySelectorAll('.product-item');

    // 如果頁面上沒有篩選按鈕，直接結束，避免報錯
    if (filterButtons.length === 0) return;

    // 動畫設定 (集中管理，方便修改)
    const animConfig = {
        keyframes: [
            { opacity: 0, transform: 'scale(0.95)' },
            { opacity: 1, transform: 'scale(1)' }
        ],
        options: {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-out'
        }
    };

    // 綁定點擊事件
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // 1. 切換按鈕樣式 (Active State)
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 2. 執行篩選
            const targetFilter = this.getAttribute('data-filter');

            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                // 判斷邏輯：符合分類 或 顯示全部 (all)
                // 注意：如果您的靜態 HTML 沒有 data-category="all"，則只比對分類
                if (targetFilter === 'all' || itemCategory === targetFilter) {
                    item.style.display = 'block';
                    // 只有顯示時才播放動畫
                    item.animate(animConfig.keyframes, animConfig.options);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 初始化：觸發預設 Active 按鈕的篩選
    const defaultBtn = document.querySelector('#portfolio-flters .active');
    if (defaultBtn) {
        // 模擬點擊，確保頁面載入時狀態正確
        defaultBtn.click();
    }
}

/**
 * 初始化首頁文章渲染
 * 依賴 js/academy.js 中的 renderHomeArticles 函式
 */
function initHomeArticles() {
    if (typeof renderHomeArticles === 'function') {
        renderHomeArticles();
    } else {
        // 開發除錯用 (上線可註解掉)
        // console.warn('renderHomeArticles 函式未找到，請確認 academy.js 是否已載入。');
    }
}

/**
         * 網頁基礎防護腳本
         * 功能：禁止右鍵、禁止選取、禁止拖曳圖片、阻擋 F12 與常見檢視原始碼快捷鍵
         */
(function () {

    // 3. 禁止拖曳圖片 (防止直接把圖片拉到桌面存檔)
    document.ondragstart = function () {
        return false;
    };

    // 4. 攔截鍵盤事件 (阻擋 F12, Ctrl+U, Ctrl+S 等)
    document.onkeydown = function (e) {
        var e = e || window.event;
        var code = e.keyCode || e.which;

        // 阻擋 F12
        if (code === 123) {
            return false;
        }

        // 阻擋組合鍵
        if (e.ctrlKey || e.metaKey) {
            // Ctrl + Shift + I (開啟開發者工具)
            if (e.shiftKey && code === 73) return false;
            // Ctrl + Shift + C (選取元素)
            if (e.shiftKey && code === 67) return false;
            // Ctrl + Shift + J (開啟控制台)
            if (e.shiftKey && code === 74) return false;
            // Ctrl + U (檢視原始碼)
            if (code === 85) return false;
            // Ctrl + S (另存新檔)
            if (code === 83) return false;
        }
    };
})();

// ... (保留原本的防護腳本) ...

// [新增] 影片切換功能
function changeVideo(videoId, title, desc, element) {
    // 1.更換 iframe 的影片網址 (加入 autoplay=1 讓點擊後自動播放)
    const iframe = document.getElementById('mainVideoFrame');
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;

    // 2.更換下方的標題與描述
    document.getElementById('mainVideoTitle').innerText = title;
    document.getElementById('mainVideoDesc').innerText = desc;

    // 3.處理列表的選中狀態 (移除別人的 active，加到自己身上)
    document.querySelectorAll('.video-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}

// ... (保留原本的防護腳本) ...

// [新增] 動態載入影片列表
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/videos')
        .then(response => response.json())
        .then(videos => {
            renderVideoGallery(videos);
        })
        .catch(err => console.error('影片載入失敗', err));
});

function renderVideoGallery(videos) {
    const listContainer = document.querySelector('.video-list-scroll');
    if (!listContainer || videos.length === 0) return;

    listContainer.innerHTML = ''; // 清空列表

    // 預設播放第一支影片
    changeVideo(videos[0]);

    videos.forEach(video => {
        const item = document.createElement('div');
        item.className = 'video-item p-2 rounded-3 mb-2 d-flex align-items-center cursor-pointer';
        // 將整個 video 物件存入 dataset，方便點擊時取用
        item.onclick = () => changeVideo(video, item);

        item.innerHTML = `
    <div class="flex-shrink-0 position-relative">
        <img src="${video.thumb}" class="rounded-3 shadow-sm bg-dark" width="120" height="68" style="object-fit: cover;" alt="thumb">
            <div class="play-overlay"><i class="bi bi-play-fill"></i></div>
    </div>
    <div class="flex-grow-1 ms-3">
        <h6 class="mb-1 fw-bold small text-truncate-2">${video.title}</h6>
        <small class="text-muted" style="font-size: 10px;">${video.type === 'youtube' ? 'YouTube' : 'Video File'}</small>
    </div>
    `;
        listContainer.appendChild(item);
    });
}

// [修改] 影片切換功能 (支援 iframe 和 video tag)
function changeVideo(video, element) {
    const container = document.querySelector('.ratio'); // 影片容器

    if (video.type === 'youtube') {
        // 如果是 YouTube，插入 iframe
        container.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${video.src}?rel=0&autoplay=1&mute=1" 
                            title="Main Video" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                `;
    } else {
        // 如果是檔案，插入 video 標籤
        container.innerHTML = `
                    <video src="${video.src}" controls autoplay muted class="w-100 h-100" style="object-fit: cover;"></video>
                `;
    }

    // 更新標題與描述
    document.getElementById('mainVideoTitle').innerText = video.title;
    document.getElementById('mainVideoDesc').innerText = video.description;

    // 處理列表的選中狀態 (active)
    if (element) {
        document.querySelectorAll('.video-item').forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }
}