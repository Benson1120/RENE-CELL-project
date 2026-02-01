function triggerTab(tabId) {
    // 1. 觸發隱藏的 Tab 按鈕點擊
    const tabButton = document.getElementById(tabId);
    if (tabButton) {
        const tab = new bootstrap.Tab(tabButton);
        tab.show();
    }

    // 2. 關閉手機版 Offcanvas
    const mobileMenu = document.getElementById('mobileMenu');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
    if (bsOffcanvas) {
        bsOffcanvas.hide();
    }

    // 3. 手機版選單自己也要變色 (視覺回饋)
    // 移除所有手機連結的 active
    document.querySelectorAll('.offcanvas-body .nav-link').forEach(link => link.classList.remove('active'));
    // 找出當前點擊的連結並加上 active
    event.target.classList.add('active');
}