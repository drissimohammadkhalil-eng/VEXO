// تحميل المنتجات من ذاكرة المتصفح أو استخدام المنتجات الافتراضية
let products = JSON.parse(localStorage.getItem('vexo_products')) || [
    { id: 1, name: "ساعة Luxury Silver", price: 12500, img: "images/p1.jpg" },
    { id: 2, name: "حذاء Premium Sport", price: 8500, img: "images/p2.jpg" }
];

let cart = [];
let isAdmin = false; // متغير لمعرفة هل المستخدم مدير أم لا

// 1. عرض المنتجات في الصفحة
function renderProducts() {
    const mainContainer = document.getElementById('main-products');
    if(!mainContainer) return;
    
    mainContainer.innerHTML = products.map((p, index) => `
        <div class="product-card">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/250'">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} د.ج</p>
                <button class="btn-buy" onclick="addToCart('${p.name}', ${p.price})">إضافة للسلة</button>
                
                ${isAdmin ? `<button onclick="deleteProduct(${index})" style="background:#ff4d4d; margin-top:10px; font-size:12px;" class="btn-buy">حذف المنتج <i class="fas fa-trash"></i></button>` : ''}
            </div>
        </div>
    `).join('');
}

// 2. وظيفة حذف منتج
function deleteProduct(index) {
    if(confirm("هل أنت متأكد من حذف هذا المنتج نهائياً؟")) {
        products.splice(index, 1); // إزالة المنتج من المصفوفة
        localStorage.setItem('vexo_products', JSON.stringify(products)); // تحديث الذاكرة
        renderProducts(); // إعادة عرض المنتجات
    }
}

// 3. إدارة السلة والقوائم
function toggleSidebar(id) {
    const sidebar = document.getElementById(id);
    if(sidebar) sidebar.classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({name, price});
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    toggleSidebar('cart-sidebar');
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const totalLabel = document.getElementById('cart-total');
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    totalLabel.innerText = total.toLocaleString();
    
    itemsContainer.innerHTML = cart.map((item, index) => `
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

// 4. نظام الشحن وحساب المجموع
function openCheckout() {
    if(cart.length === 0) return alert("السلة فارغة!");
    toggleSidebar('cart-sidebar');
    toggleSidebar('checkout-sidebar');
    calculateShipping();
}

function calculateShipping() {
    const select = document.getElementById('wilaya-select');
    const shipCost = parseInt(select.options[select.selectedIndex].getAttribute('data-price')) || 0;
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    
    document.getElementById('shipping-cost').innerText = shipCost;
    document.getElementById('final-total').innerText = (subtotal + shipCost).toLocaleString();
}

// 5. تأكيد الطلب عبر واتساب
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const wilaya = document.getElementById('wilaya-select').value;
    const total = document.getElementById('final-total').innerText;

    if(!name || !phone || wilaya === "0") return alert("يرجى إكمال بياناتك");

    let message = `*طلب جديد من متجر VEXO*\n\n`;
    message += `*الاسم:* ${name}\n*الهاتف:* ${phone}\n*الولاية:* ${wilaya}\n\n`;
    message += `*المنتجات:*\n` + cart.map(i => `- ${i.name}`).join('\n');
    message += `\n\n*الإجمالي النهائي:* ${total} د.ج`;

    window.open(`https://wa.me/213779310866?text=${encodeURIComponent(message)}`);
}

// 6. لوحة الإدارة
function loginAdmin() {
    if(prompt("كلمة مرور الإدارة:") === "1234") {
        isAdmin = true; // تفعيل وضع المدير
        document.getElementById('admin-panel').style.display = 'block';
        renderProducts(); // إعادة العرض لإظهار أزرار الحذف
    }
}

function addNewProduct() {
    const name = document.getElementById('p-name').value;
    const price = parseInt(document.getElementById('p-price').value);
    const img = document.getElementById('p-img').value;

    if(name && price) {
        products.push({id: Date.now(), name, price, img});
        localStorage.setItem('vexo_products', JSON.stringify(products));
        renderProducts();
        alert("تمت الإضافة!");
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
        document.getElementById('p-img').value = "";
    }
}

window.onload = renderProducts;
