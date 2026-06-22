const rawCart = localStorage.getItem("Cart");
let cart = rawCart ? JSON.parse(rawCart) : [];
let cartQuantity = 0;

let cartItems = document.getElementById("cart-items");
for (let i = 0; i < cart.length; i++) {
  cartQuantity += cart[i].quantity;
  createProductCard(cart[i]);
}
let totalPrice = cartQuantity * 200;
let totalPriceElement=document.getElementById("total-price");
totalPriceElement.textContent=`Total is ${totalPrice} $`;
let itemsCountElement = document.getElementById("items-count");
itemsCountElement.textContent = cartQuantity + " Item";

function createProductCard(product) {
  let qid = product.id + "qty";

  cartItems.innerHTML += `
    <div class="card-item">
      <div class="cart-item-image">
        <img src="./assets/images/2.jpg" alt="Product" />
      </div>
      <p class="item-info">"${product.name}"</p>
      
      <div class="item-control">
        <button class="adding-minus-button" onclick="updateQuantity('${product.id}', -1)">
          <i class="fa-solid fa-minus"></i>
        </button>
        
        <p class="current-item-count" id="${qid}">${product.quantity}</p>
        <button class="adding-minus-button" onclick="updateQuantity('${product.id}', 1)">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      
      <p class="item-price">$200</p>
      
      <button class="delete-item" onclick="removeItem('${product.id}')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;
}

function updateQuantity(pId, change) {
  let currentItem = cart.find(function (item) {
    return pId == item.id;
  });

  if (currentItem) {
    if (currentItem.quantity == 1 && change < 1) {
      alert("can not decrase");
    } else {
      currentItem.quantity += change;
      cartQuantity += change;
      let quantityElement = document.getElementById(pId + "qty");
      if (quantityElement) {
        quantityElement.textContent = currentItem.quantity;
        totalPrice=cartQuantity*200;
      }else{} // ask
      itemsCountElement.textContent = cartQuantity + "Items";
      totalPriceElement.textContent=`Total is ${totalPrice} $`;
      localStorage.setItem("Cart", JSON.stringify(cart));
    }
  } else {
    console.log("❌ لم يتم العثور على المنتج في السلة");
  }
}

function removeItem(productId) {
  // 1. توحيد نوع الـ ID (نص أو رقم) لتجنب مشاكل المقارنة
  const targetId = String(productId);

  // 2. إيجاد فهرس العنصر في المصفوفة
  const itemIndex = cart.findIndex((item) => String(item.id) === targetId);

  if (itemIndex !== -1) {
    // 3. حذفه من مصفوفة السلة
    cart.splice(itemIndex, 1);

    // 4. تحديث الـ LocalStorage
    localStorage.setItem("Cart", JSON.stringify(cart));

    // 5. إزالة البطاقة من الواجهة (DOM)
    // نبحث عن عنصر الكمية ثم نصعد للعنصر الأب .card-item
    const qtyElement = document.getElementById(`${targetId}qty`);
    if (qtyElement) {
      const cardElement = qtyElement.closest(".card-item");
      if (cardElement) cardElement.remove();
    }

    // 6. تحديث عداد العناصر الكلي

    console.log(`🗑️ تم حذف المنتج ${targetId} بنجاح`);
  } else {
    console.log("❌ لم يتم العثور على المنتج للحذف");
  }
}

// if we have price for each price I was declare  total variable then get quantity for each then * of its price then add to total
function calcTotalPrice() {
  for (let i = 0; i < cart.length; i++) {
    let q = cart[i].quantity;
    // let p = cart[i].price;
    // total +=q*p;
  }
}
