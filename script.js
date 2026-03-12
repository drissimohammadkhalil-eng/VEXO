let products = [
    { id: 1, name: "ساعة Luxury Silver", price: 12500, img: "images/p1.jpg" },
    { id: 2, name: "حذاء Premium Sport", price: 8500, img: "images/p2.jpg" }
];
let cart = [];

// عرض المنتجات في الصفحة
function renderProducts() {
    const mainContainer = document.getElementById('main-products');
    if(!mainContainer) return;
    mainContainer.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/250'">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} د.ج</p>
                <button class="btn-buy" onclick="addToCart('${p.name}', ${p.price})">إضافة للسلة</button>
            </div>
        </div>
    `).join('');
}

// فتح وإغلاق القوائم الجانبية
function toggleSidebar(id) {
    document.getElementById(id).classList.toggle('active');
}

// إضافة منتج للسلة
function addToCart(n, p) {
    cart.push({n, p});
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    toggleSidebar('cart-sidebar');
}

// تحديث واجهة السلة
function updateCartUI() {
    let total = cart.reduce((sum, item) => sum + item.p, 0);
    document.getElementById('cart-total').innerText = total.toLocaleString();
    document.getElementById('cart-items').innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <span>${item.n}</span>
            <b style="color:red; cursor:pointer;" onclick="removeItem(${i})">×</b>
        </div>
    `).join('');
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCartUI();
    document.getElementById('cart-count').innerText = cart.length;
}

// نظام الولايات
function openCheckout() {
    if(cart.length === 0) return alert("السلة فارغة");
    toggleSidebar('cart-sidebar');
    toggleSidebar('checkout-sidebar');
    calculateShipping();
}

function calculateShipping() {
    const select = document.getElementById('wilaya-select');
    const ship = parseInt(select.options[select.selectedIndex].getAttribute('data-price')) || 0;
    const sub = cart.reduce((sum, item) => sum + item.p, 0);
    document.getElementById('shipping-cost').innerText = ship;
    document.getElementById('final-total').innerText = (sub + ship).toLocaleString();
}

// إرسال الطلب عبر واتساب
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const wilaya = document.getElementById('wilaya-select').value;
    const total = document.getElementById('final-total').innerText;

    if(!name || !phone || wilaya === "0") return alert("يرجى ملء كافة البيانات");

    let msg = `*طلب جديد من متجر VEXO*\n\n`;
    msg += `*الاسم:* ${name}\n`;
    msg += `*الهاتف:* ${phone}\n`;
    msg += `*الولاية:* ${wilaya}\n\n`;
    msg += `*المنتجات:* \n`;
    cart.forEach(item => msg += `- ${item.n}\n`);
    msg += `\n*الإجمالي النهائي:* ${total} د.ج`;

    window.open(`https://wa.me/213779310866?text=${encodeURIComponent(msg)}`);
}

// نظام الإدارة
function loginAdmin() {
    let pass = prompt("كلمة مرور الإدارة:");
    if(pass === "1234") {
        document.getElementById('admin-panel').style.display = 'block';
    } else {
        alert("كلمة مرور خاطئة");
    }
}

function addNewProduct() {
    const name = document.getElementById('p-name').value;
    const price = parseInt(document.getElementById('p-price').value);
    const img = document.getElementById('p-img').value;
    if(name && price) {
        products.push({id: Date.now(), name, price, img});
        renderProducts();
        alert("تمت إضافة المنتج بنجاح!");
    }
}

// تشغيل عند التحميل
window.onload = renderProducts;
