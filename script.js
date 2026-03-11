// 1. مصفوفة لتخزين محتويات السلة
let cart = [];

/**
 * 2. وظيفة لفتح وإغلاق السلة الجانبية
 * تقوم بتبديل كلاس 'active' في الـ CSS لإظهار السلة أو إخفائها
 */
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * 3. وظيفة إضافة منتج للسلة
 * @param {string} name - اسم المنتج
 * @param {number} price - سعر المنتج
 */
function addToCart(name, price) {
    // البحث إذا كان المنتج موجود مسبقاً لزيادة الكمية فقط
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // إضافة منتج جديد للمصفوفة
        cart.push({ 
            name: name, 
            price: price, 
            quantity: 1 
        });
    }
    
    // تحديث الواجهة بعد الإضافة
    updateCartUI();
    
    // فتح السلة تلقائياً عند إضافة منتج ليشعر المستخدم بالتفاعل
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('active')) {
        toggleCart();
    }
}

/**
 * 4. وظيفة تحديث واجهة السلة (UI)
 * تقوم بمسح محتوى السلة في الـ HTML وإعادة رسمه بناءً على المصفوفة
 */
function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cart-total');
    
    if (!itemsContainer) return;

    // مسح المحتوى الحالي
    itemsContainer.innerHTML = '';
    
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        // إنشاء عنصر المنتج داخل السلة
        itemsContainer.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div class="item-info">
                    <h4 style="font-size: 14px; margin:0;">${item.name}</h4>
                    <p style="color:#e44d26; font-size: 13px; margin:5px 0 0 0;">${item.price.toLocaleString()} د.ج × ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:16px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    // تحديث الأرقام الإجمالية
    if (countLabel) countLabel.innerText = count;
    if (totalLabel) totalLabel.innerText = total.toLocaleString();
}

/**
 * 5. وظيفة حذف منتج من السلة
 * @param {number} index - ترتيب المنتج في المصفوفة
 */
function removeItem(index) {
    cart.splice(index, 1); // حذف العنصر من المصفوفة
    updateCartUI(); // إعادة رسم السلة
}

// 6. إضافة مستمع للأحداث للتأكد من أن السلة تغلق عند الضغط على مفتاح Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});
