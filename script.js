// مصفوفة لتخزين محتويات السلة
let cart = [];
let total = 0;

// وظيفة لفتح وإغلاق السلة
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// وظيفة إضافة منتج للسلة
function addToCart(name, price) {
    // التحقق إذا كان المنتج موجود مسبقاً
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCartUI();
    // تنبيه بسيط للمستخدم
    console.log(`تم إضافة ${name} للسلة`);
}

// وظيفة تحديث واجهة السلة
function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    // مسح المحتوى القديم
    cartItemsElement.innerHTML = '';
    
    let itemCount = 0;
    total = 0;

    cart.forEach((item, index) => {
        itemCount += item.quantity;
        total += item.price * item.quantity;

        cartItemsElement.innerHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} د.ج × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartCountElement.innerText = itemCount;
    cartTotalElement.innerText = total.toLocaleString();
}

// وظيفة حذف منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
