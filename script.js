
// ============================
// VEXO STORE SCRIPT
// ============================

// سلة المشتريات
let cart = JSON.parse(localStorage.getItem("cart")) || []


// ============================
// إضافة منتج للسلة
// ============================

function addToCart(name, price) {

const product = {
name: name,
price: price
}

cart.push(product)

saveCart()

alert("تمت إضافة المنتج إلى السلة")

}



// ============================
// حفظ السلة
// ============================

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart))

}



// ============================
// عرض السلة
// ============================

function displayCart(){

const cartContainer = document.getElementById("cart")

if(!cartContainer) return

cartContainer.innerHTML = ""

let total = 0

cart.forEach((product,index)=>{

total += product.price

cartContainer.innerHTML += `

<div class="cart-item">

<p>${product.name}</p>

<p>${product.price} DA</p>

<button onclick="removeFromCart(${index})">
حذف
</button>

</div>

`

})

document.getElementById("total").innerText = total + " DA"

}



// ============================
// حذف منتج
// ============================

function removeFromCart(index){

cart.splice(index,1)

saveCart()

displayCart()

}



// ============================
// إرسال الطلب إلى WhatsApp
// ============================

function sendOrder(){

let name = document.getElementById("name").value
let phone = document.getElementById("phone").value
let state = document.getElementById("state").value

if(cart.length === 0){

alert("السلة فارغة")

return

}

let message = "طلب جديد من متجر VEXO%0A%0A"

let total = 0

cart.forEach(product=>{

message += product.name + " - " + product.price + " DA%0A"

total += product.price

})

message += "%0Aالمجموع: " + total + " DA"

message += "%0A%0Aالاسم: " + name
message += "%0Aالهاتف: " + phone
message += "%0Aالولاية: " + state

let whatsapp = "https://wa.me/213779310866?text=" + message

window.open(whatsapp)

}



// ============================
// تشغيل عرض السلة عند تحميل الصفحة
// ============================

displayCart()
