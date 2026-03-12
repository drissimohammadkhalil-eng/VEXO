// 1. جلب البيانات والأصول المخزنة
let products = JSON.parse(localStorage.getItem('vexo_products')) || [];
let siteAssets = JSON.parse(localStorage.getItem('vexo_assets')) || {
    logo: null,
    hero: "https://via.placeholder.com/500x400?text=VEXO+PREMIUM"
};
let cart = [];
let isAdmin = false;

// 2. إدارة الأصول (لوغو وواجهة)
function updateSiteAsset(type) {
    const file = type === 'logo' ? document.getElementById('upload-logo').files[0] : document.getElementById('upload-hero').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            siteAssets[type] = e.target.result;
            localStorage.setItem('vexo_assets', JSON.stringify(siteAssets));
            applyAssets();
            alert("تم تحديث الموقع بنجاح!");
        };
        reader.readAsDataURL(file);
    }
}

function applyAssets() {
    if (siteAssets.logo) {
        document.getElementById('site-logo-container').innerHTML = `<img src="${siteAssets.logo}" alt="Logo">`;
    }
    if (siteAssets.hero) {
        document.getElementById('main-hero-img').src = siteAssets.hero;
    }
}

// 3. عرض المنتجات
function renderProducts() {
    const container = document.getElementById('main-products');
    if(!container) return;
    container.innerHTML = products.map((p, index) => `
        <div class="product-card">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/400'">
            <div class="product-info">
                <h3>${p.name}</h3>
                <span class="price">${p.price.toLocaleString()} د.ج</span>
                <button class="btn-buy" onclick="addToCart('${p.name}', ${p.price})">إضافة للسلة</button>
                ${isAdmin ? `<button class="btn-buy" style="background:#ef4444" onclick="deleteProduct(${index})">حذف المنتج</button>` : ''}
            </div>
        </div>
    `).join('');
}

// 4. السلة والدفع
function toggleSidebar(id) { document.getElementById(id).classList.toggle('active'); }

function addToCart(name, price) {
    cart.push({name, price});
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    toggleSidebar('cart-sidebar');
}

function updateCartUI() {
    let total = cart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('cart-total').innerText = total.toLocaleString();
    document.getElementById('cart-items').innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span>${item.name}</span>
            <b style="color:red; cursor:pointer;" onclick="removeItem(${index})">×</b>
        </div>
    `).join('');
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
    document.getElementById('cart-count').innerText = cart.length;
}

function openCheckout() {
    if(cart.length === 0) return alert("السلة فارغة");
    toggleSidebar('cart-sidebar');
    toggleSidebar('checkout-sidebar');
    calculateShipping();
}

function calculateShipping() {
    const select = document.getElementById('wilaya-select');
    const ship = parseInt(select.options[select.selectedIndex].getAttribute('data-price')) || 0;
    const sub = cart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('shipping-cost').innerText = ship.toLocaleString();
    document.getElementById('final-total').innerText = (sub + ship).toLocaleString();
}

function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const wilaya = document.getElementById('wilaya-select').value;
    const total = document.getElementById('final-total').innerText;
    if(!name || !phone || wilaya === "0") return alert("أكمل البيانات");
    let msg = `*طلب جديد VEXO*\n\nالاسم: ${name}\nالهاتف: ${phone}\nالولاية: ${wilaya}\n\nالمنتجات:\n${cart.map(i => '- ' + i.name).join('\n')}\n\nالإجمالي: ${total} د.ج`;
    window.open(`https://wa.me/213779310866?text=${encodeURIComponent(msg)}`);
}

// 5. الإدارة المتقدمة
function loginAdmin() {
    if(prompt("كلمة المرور:") === "1234") {
        isAdmin = true;
        document.getElementById('admin-panel').style.display = 'block';
        renderProducts();
    }
}

function addNewProduct() {
    const name = document.getElementById('p-name').value;
    const price = parseInt(document.getElementById('p-price').value);
    const imgFile = document.getElementById('p-img').files[0];
    if(name && price && imgFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            products.push({id: Date.now(), name, price, img: e.target.result});
            localStorage.setItem('vexo_products', JSON.stringify(products));
            renderProducts();
            alert("تم إضافة المنتج!");
            document.getElementById('p-name').value = "";
            document.getElementById('p-price').value = "";
        };
        reader.readAsDataURL(imgFile);
    }
}

function deleteProduct(index) {
    if(confirm("حذف؟")) {
        products.splice(index, 1);
        localStorage.setItem('vexo_products', JSON.stringify(products));
        renderProducts();
    }
}

window.onload = function() {
    renderProducts();
    applyAssets();
};
