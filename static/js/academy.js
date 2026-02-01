// ==========================================
// 1. 文章資料庫 (Mock Data)
// ==========================================
const articlesData = [
    {
        id: 1, title: "【獨家技術】揭密 RENE CELL 的 4 大皮膚科學",
        category: "健康生活", date: "2026/01/12", tags: "科研,成分,技術", img: "/static/images/A01.jpg",
        content: `
            <p class="lead fw-bold">結合頂尖科研與天然成分，喚醒肌膚原生力量。</p>
            <p>RENE CELL 始終堅持以科學為基礎。我們不只追求表面的改善，更深入肌膚底層，透過四大核心技術，為您打造健康穩定的肌膚屏障。</p>
            <hr class="my-4 opacity-10">
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="science-card h-100 p-4 border-0 rounded-4">
                        <div class="d-flex justify-content-between mb-2">
                            <i class="bi bi-layers-half fs-2 text-brand"></i>
                            <div class="number-icon">01</div>
                        </div>
                        <h5 class="fw-bold mb-2 serif-font">微分子高滲透科學</h5>
                        <p class="small text-secondary mb-0 text-justify">
                            透過微分子技術實現高效滲透，層層調理肌膚紋理，穩定肌膚原生保護力，讓營養直達肌底。
                        </p>
                    </div>
                </div>
                </div>
            <p class="mt-4 small text-muted">我們相信，只有透過科學的驗證與天然的堅持，才能帶給肌膚最真實的改變。</p>
        `
    },
    {
        id: 2, title: "【保養迷思】乾肌、油肌還是混合肌？其實妳不需要這麼多瓶瓶罐罐",
        category: "肌膚保養", date: "2026/01/18", tags: "膚質,保養觀念,膠原蛋白", img: "/static/images/A04.jpg",
        content: "妳還在為了挑選「適合膚質」的產品而煩惱嗎？傳統的保養觀念告訴我們..."
    },
    {
        id: 3, title: "【抗老觀念】25歲是肌膚的分水嶺？對抗「地心引力」的保養關鍵",
        category: "肌膚保養", date: "2026/01/15", tags: "抗老,膠原蛋白,25歲", img: "/static/images/A03.jpg",
        content: "衰老是女人的天敵？為什麼 25 歲後感覺老得特別快？許多人以為青春可以揮霍..."
    },
];

// ==========================================
// 2. 系統變數與初始化
// ==========================================
let currentPage = 1;
const itemsPerPage = 4; // 增加每頁顯示文章數，提升瀏覽體驗
let filteredArticles = [...articlesData]; // 預設顯示全部

// DOM 元素快取 (避免重複查詢)
const dom = {
    articleContainer: document.getElementById('article-container'),
    paginationContainer: document.getElementById('pagination-container'),
    noResultDiv: document.getElementById('no-result'),
    searchInput: document.getElementById('searchInput'),
    sidebarContainer: document.getElementById('category-sidebar-container'),
    homeContainer: document.getElementById('home-article-container')
};

// 監聽頁面載入
document.addEventListener('DOMContentLoaded', () => {
    // 判斷當前頁面是「學院首頁」還是「網站首頁」
    if (dom.articleContainer) {
        // 學院頁面邏輯
        updateView();
        renderSidebarCategories();
    }

    if (dom.homeContainer) {
        // 首頁精選文章邏輯
        renderHomeArticles();
    }
});

// ==========================================
// 3. 核心功能：更新畫面 (整合渲染與分頁)
// ==========================================
function updateView() {
    renderArticles();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 4. 側邊欄動態分類功能 (效能優化版)
// ==========================================
function renderSidebarCategories() {
    if (!dom.sidebarContainer) return;

    // 1. 統計分類數量
    const categoryCounts = articlesData.reduce((acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
    }, {});

    // 2. 使用 DocumentFragment 減少 DOM 操作
    const fragment = document.createDocumentFragment();

    // 標題區塊
    const headerDiv = document.createElement('div');
    headerDiv.className = 'p-3 border-bottom d-flex justify-content-between align-items-center';
    headerDiv.innerHTML = `
        <h5 class="fw-bold mb-0">文章分類</h5>
        <button class="btn btn-sm btn-link text-muted text-decoration-none" onclick="resetFilter()">顯示全部</button>
    `;
    fragment.appendChild(headerDiv);

    // 分類列表
    Object.keys(categoryCounts).forEach(category => {
        const count = categoryCounts[category];
        const link = document.createElement('a');
        link.href = 'javascript:void(0)';
        link.className = 'category-link d-flex justify-content-between';
        link.onclick = () => filterCategory(category);
        link.innerHTML = `
            <span>${category}</span> 
            <span class="badge bg-light text-dark rounded-pill">${count}</span>
        `;
        fragment.appendChild(link);
    });

    dom.sidebarContainer.innerHTML = ''; // 清空 loading
    dom.sidebarContainer.appendChild(fragment);
}

// ==========================================
// 5. 渲染文章卡片
// ==========================================
function renderArticles() {
    if (!dom.articleContainer) return;

    dom.articleContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredArticles.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
        dom.noResultDiv.style.display = 'block';
        dom.paginationContainer.style.display = 'none';
        return;
    } else {
        dom.noResultDiv.style.display = 'none';
        dom.paginationContainer.style.display = 'flex';
    }

    pageItems.forEach(article => {
        // 移除 HTML 標籤取得純文字摘要
        const plainText = article.content.replace(/<[^>]+>/g, '').substring(0, 60) + '...';

        const cardHTML = `
            <div class="col-md-6 animate-fade-in">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="position-relative">
                        <span class="badge bg-brand position-absolute top-0 start-0 m-3">${article.category}</span>
                        <img src="${article.img}" class="card-img-top blog-card-img" alt="${article.title}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <small class="text-muted"><i class="bi bi-calendar3"></i> ${article.date}</small>
                        <h5 class="card-title fw-bold mt-2 text-truncate">${article.title}</h5>
                        <p class="card-text text-muted small text-truncate-2" style="min-height: 40px;">
                            ${plainText}
                        </p>
                        <a href="javascript:void(0)" class="text-brand text-decoration-none fw-bold small stretched-link" 
                           onclick="openArticleModal(${article.id})">
                           閱讀全文 <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        dom.articleContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// ==========================================
// 6. 渲染分頁按鈕
// ==========================================
function renderPagination() {
    if (!dom.paginationContainer) return;

    dom.paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

    if (totalPages <= 1) return;

    const createPageItem = (text, page, isActive = false, isDisabled = false) => {
        const li = document.createElement('li');
        li.className = `page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
        li.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="changePage(${page})">${text}</a>`;
        return li;
    };

    // 上一頁
    dom.paginationContainer.appendChild(createPageItem('上一頁', currentPage - 1, false, currentPage === 1));

    // 數字頁碼
    for (let i = 1; i <= totalPages; i++) {
        dom.paginationContainer.appendChild(createPageItem(i, i, i === currentPage));
    }

    // 下一頁
    dom.paginationContainer.appendChild(createPageItem('下一頁', currentPage + 1, false, currentPage === totalPages));
}

function changePage(page) {
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    updateView();
}

// ==========================================
// 7. 篩選功能 (搜尋、分類、標籤)
// ==========================================
function applyFilter(newFilteredArticles) {
    filteredArticles = newFilteredArticles;
    currentPage = 1;
    updateView();
}

function searchArticles() {
    if (!dom.searchInput) return;
    const keyword = dom.searchInput.value.toLowerCase().trim();
    if (!keyword) return resetFilter();

    const result = articlesData.filter(article =>
        article.title.toLowerCase().includes(keyword) ||
        article.content.toLowerCase().includes(keyword)
    );
    applyFilter(result);
}

// 綁定 Enter 鍵
if (dom.searchInput) {
    dom.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchArticles();
    });
}

function filterCategory(category) {
    const result = articlesData.filter(article => article.category === category);
    applyFilter(result);
}

function filterTag(tag) {
    const result = articlesData.filter(article => article.tags.includes(tag));
    applyFilter(result);
}

function resetFilter() {
    if (dom.searchInput) dom.searchInput.value = '';
    applyFilter([...articlesData]);
}

// ==========================================
// 8. 彈出視窗功能 (文章詳情)
// ==========================================
function openArticleModal(id) {
    const article = articlesData.find(a => a.id === id);
    if (!article) return;

    // ... (前段代碼保持不變) ...
    document.getElementById('modal-img').src = article.img;

    // 生成模擬內文
    const tagList = article.tags.split(',').map(tag => `<span class="badge bg-light text-dark me-1">#${tag}</span>`).join('');

    let contentHtml = article.content.includes('<') ? article.content : `
        <p class="lead fw-bold text-dark">${article.content}</p>
        <hr class="my-4 opacity-10">
        <p>在這個快節奏的時代，我們往往忽略了${article.category}的重要性。其實，真正的改變來自於每天一點點的累積。</p>
        <h5 class="text-brand mt-4 mb-3">專家建議的三個關鍵：</h5>
        <ul class="list-unstyled">
            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> <strong>持續性：</strong> 這是最重要的一點，三天捕魚兩天曬網是看不到效果的。</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> <strong>正確觀念：</strong> 不要盲目跟風，適合別人的不一定適合你。</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> <strong>搭配輔助：</strong> 好的產品能讓你事半功倍。</li>
        </ul>
        <p class="mt-4">總結來說，${article.title} 不僅僅是一個話題，更是一種生活態度。RENE CELL 始終陪伴在您身邊，提供最優質的解決方案。</p>
    `;

    // [修改重點]：在 <a> 標籤中加入 data-bs-dismiss="modal"
    document.getElementById('modal-content').innerHTML = `
        <div class="mb-3">${tagList}</div>
        ${contentHtml}
        
    `;

    // ... (後段代碼保持不變) ...
    if (typeof bootstrap !== 'undefined') {
        const modalElement = document.getElementById('dynamicArticleModal');
        const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        myModal.show();
    }
}

// ==========================================
// 9. 首頁專用：渲染精選文章 (Home Page)
// ==========================================
function renderHomeArticles() {
    if (!dom.homeContainer) return;

    // 取前 3 篇
    const featuredArticles = articlesData.slice(0, 3);
    dom.homeContainer.innerHTML = '';

    featuredArticles.forEach(article => {
        const plainText = article.content.replace(/<[^>]+>/g, '').substring(0, 50) + '...';

        const cardHTML = `
            <div class="col-lg-4">
                <div class="card border-0 shadow-sm mb-3 h-100">
                    <div class="row g-0 h-100">
                        <div class="col-md-4">
                            <img src="${article.img}" class="img-fluid rounded-start h-100 object-fit-cover blog-card-img" alt="${article.title}" loading="lazy">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body d-flex flex-column h-100">
                                <h6 class="card-title fw-bold text-truncate">${article.title}</h6>
                                <p class="card-text small text-muted flex-grow-1 text-truncate-2">
                                    ${plainText}
                                </p>
                                <a href="javascript:void(0)" class="text-brand small text-decoration-none mt-2"
                                   onclick="openArticleModal(${article.id})">
                                    閱讀更多 >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dom.homeContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/**
 * 網頁基礎防護腳本
 * 功能：禁止右鍵、禁止選取、禁止拖曳圖片、阻擋 F12 與常見檢視原始碼快捷鍵
 */
(function () {
    // 1. 禁止右鍵選單
    document.oncontextmenu = function () {
        return false;
    };

    // 2. 禁止選取文字 (針對不同瀏覽器的相容寫法)
    document.onselectstart = function () {
        return false;
    };
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none'; // Chrome, Safari
    document.body.style.mozUserSelect = 'none';    // Firefox

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