document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(productsData => {
            injectCustomStyles();
            initProducts(productsData);
        })
        .catch(error => console.error('無法載入產品:', error));
});

function injectCustomStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --brand-pink: #d63384; --brand-pink-hover: #c22e78; }
        .text-pink { color: var(--brand-pink) !important; }
        .bg-pink { background-color: var(--brand-pink) !important; }
        .border-pink { border-color: var(--brand-pink) !important; }
        .btn-pink { background-color: var(--brand-pink); color: white; border: none; }
        .btn-pink:hover { background-color: var(--brand-pink-hover); color: white; }
        .btn-outline-pink { color: var(--brand-pink); border-color: var(--brand-pink); background: white; }
        .btn-outline-pink:hover { background-color: var(--brand-pink); color: white; }
        .bg-pink-light { background-color: rgba(214, 51, 132, 0.08) !important; }

        #product-list {
            display: flex; flex-wrap: nowrap; overflow-x: auto; scroll-behavior: smooth;
            gap: 24px; padding: 20px 5px; scrollbar-width: none;
        }
        #product-list::-webkit-scrollbar { display: none; }
        
        .product-card-wrapper { min-width: 280px; max-width: 280px; }
        .product-card-original {
            border: 1px solid #eee; transition: all 0.3s ease; background: white;
        }
        .product-card-original:hover {
            transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.1); border-color: var(--brand-pink);
        }
        .badge-champions {
            background-color: #198754; font-size: 0.8rem; padding: 0.4em 0.8em;
        }
        .small-text-btn { font-size: 0.85rem; }
        
        .modal-checkpoint-box {
            background-color: rgba(214, 51, 132, 0.08); border-radius: 12px; padding: 20px;
        }
        .feature-icon-box {
            width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%; border: 1px solid #eee; margin: 0 auto 10px; color: var(--brand-pink);
        }
        .member-save-badge {
            background-color: #f8f9fa; border: 1px solid #dee2e6; color: #6c757d; font-size: 0.8rem; padding: 2px 8px; margin-left: 8px;
        }
    `;
    document.head.appendChild(style);
}

function initProducts(productsData) {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('#portfolio-flters button');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!productList) return;

    const categoryMap = { 'skincare': '護膚系列', 'premium': '高級系列', 'mask': '面膜系列', 'special': '特別護理' };

    function renderProducts(filter) {
        productList.innerHTML = '';
        const filteredProducts = (filter === 'all') ? productsData : productsData.filter(product => product.category === filter);

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<div class="text-center w-100 py-5 text-muted opacity-50">此分類暫無商品</div>';
            return;
        }

        filteredProducts.forEach(product => {
            const col = document.createElement('div');
            col.className = 'product-card-wrapper';

            col.innerHTML = `
                <div class="card h-100 product-card-original rounded-4 overflow-hidden position-relative" style="cursor: pointer;">
                    ${product.badge_text ? `
                        <div class="position-absolute top-0 start-0 m-3 z-2">
                            <span class="badge rounded-pill badge-champions">${product.badge_text}</span>
                        </div>
                    ` : ''}
                    
                    <div class="p-4 text-center">
                        <img src="${product.img}" class="img-fluid" style="max-height: 220px; object-fit: contain;" alt="${product.name}">
                    </div>
                    
                    <div class="card-body text-center pt-0 pb-4 px-3 d-flex flex-column">
                        <h5 class="fw-bold mb-1 text-dark">${product.name}</h5>
                        <p class="text-muted small text-truncate mb-3">${product.subtitle || '&nbsp;'}</p>
                        
                        <div class="mt-auto">
                            <div class="mb-3">
                                ${product.original_price ? `<small class="text-decoration-line-through text-muted me-2">原價 ${product.original_price}</small>` : ''}
                                <div class="text-pink fw-bold fs-4 d-flex align-items-center justify-content-center">
                                    <i class="bi bi-gem me-1 fs-6"></i>會員價 ${product.price}
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-pink rounded-pill py-2 fw-bold">我想購買</button>
                                <button class="btn btn-outline-secondary rounded-pill small-text-btn py-2 border">查看成分與評價 <i class="bi bi-eye"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(col);
            col.querySelector('.card').addEventListener('click', () => showProductModal(product));
        });
    }

    renderProducts('skincare');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('btn-active', 'btn-brand', 'text-white', 'shadow-sm'));
            btn.classList.add('btn-brand', 'text-white', 'shadow-sm');
            renderProducts(btn.getAttribute('data-filter'));
        });
    });

    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => productList.scrollBy({ left: -300, behavior: 'smooth' }));
        scrollRightBtn.addEventListener('click', () => productList.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    function showProductModal(product) {
        const modalEl = document.getElementById('dynamicProductModal');
        if (!modalEl) return;
        const modalBody = modalEl.querySelector('.modal-body');
        const modal = new bootstrap.Modal(modalEl);

        let saveAmount = '';
        if (product.original_price && product.price) {
            try {
                const orig = parseInt(product.original_price.replace(/[^\d]/g, ''));
                const curr = parseInt(product.price.replace(/[^\d]/g, ''));
                if (!isNaN(orig) && !isNaN(curr)) {
                    saveAmount = `會員現省 $${orig - curr}`;
                }
            } catch (e) { }
        }

        modalBody.innerHTML = `
            <div class="row g-0">
                <div class="col-lg-5 bg-white d-flex align-items-center justify-content-center p-5 border-end">
                    <div class="position-relative w-100 text-center">
                        ${product.badge_text ? `
                            <div class="position-absolute top-0 start-0 z-2">
                                <span class="badge rounded-pill badge-champions">${product.badge_text}</span>
                            </div>
                        ` : ''}
                        <img src="${product.img}" class="img-fluid" style="max-height: 800px; object-fit: contain;" alt="${product.name}">
                    </div>
                </div>
                
                <div class="col-lg-7 p-5" style="max-height: 90vh; overflow-y: auto;">
                    <small class="text-pink fw-bold ls-1">RENE CELL SKIN SCIENCE</small>
                    <h2 class="fw-bold serif-font my-3 display-6">${product.name}</h2>
                    <p class="text-secondary fs-5 mb-4">${product.subtitle || ''}</p>
                    
                    <div class="d-flex align-items-center mb-5">
                        <h3 class="text-pink fw-bold mb-0 me-3 display-5">${product.price}</h3>
                        ${product.original_price ? `<span class="text-muted text-decoration-line-through me-3 fs-5">原價 ${product.original_price}</span>` : ''}
                        ${saveAmount ? `<span class="badge rounded-pill member-save-badge">${saveAmount}</span>` : ''}
                    </div>

                    <div class="modal-checkpoint-box mb-3">
                        <h6 class="fw-bold text-pink mb-3"><i class="bi bi-stars me-2"></i>產品亮點 Check Point</h6>
                        <p class="text-secondary mb-0 small" style="line-height: 1.8; white-space: pre-wrap;">${product.description || '暫無描述'}</p>
                    </div>

                    <div class="row text-center mb-5 g-3">
                        <div class="col-3"><div class="feature-icon-box"><i class="bi bi-layers fs-4"></i></div><small class="text-muted">深層滲透</small></div>
                        <div class="col-3"><div class="feature-icon-box"><i class="bi bi-shield-check fs-4"></i></div><small class="text-muted">屏障修護</small></div>
                        <div class="col-3"><div class="feature-icon-box"><i class="bi bi-droplet-half fs-4"></i></div><small class="text-muted">油水平衡</small></div>
                        <div class="col-3"><div class="feature-icon-box"><i class="bi bi-sun fs-4"></i></div><small class="text-muted">提亮光澤</small></div>
                    </div>

                    <div class="row mb-3 g-4">
                        <div class="col-md-6">
                            <h6 class="fw-bold mb-3">使用方法 How to use</h6>
                            <p class="text-muted small mb-0" style="white-space: pre-wrap;">${product.how_to_use || '暫無使用說明'}</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold mb-3">用戶好評 Review</h6>
                            <div class="bg-light p-3 rounded-3 small text-muted fst-italic">
                                <div class="text-warning mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> 4.9</div>
                                "${product.user_reviews || '暫無評論'}"
                            </div>
                        </div>
                    </div>

                    <div class="d-grid">
                        <a href="https://lin.ee/JGR0PKq" target="_blank" class="btn btn-pink rounded-pill py-3 shadow-sm fw-bold fs-5">
                            <i class="bi bi-cart-fill me-2"></i>立即購買 / 加入經銷
                        </a>
                    </div>
                </div>
            </div>
        `;
        modal.show();
    }
}