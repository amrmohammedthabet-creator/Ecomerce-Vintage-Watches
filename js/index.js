
(function protectPage() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
})();

document.getElementById("logout")?.addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  alert("👋 Logged out successfully!");
  window.location.href = "login.html";
});



let xhr = new XMLHttpRequest();
let baseUrl = "https://reqres.in/api/";
let images = [
  { src: "../assets/images/1.jpg", caption: "Timeless style, every second" },
  { src: "../assets/images/2.jpg", caption: "Elevate your moment." },
  {
    src: "../assets/images/3.jpg",
    caption: "Precision crafted for your legacy.",
  },
];

let sliderImage = document.getElementById("slider-image");
let currentIndex = 0;

sliderImage.src = images[currentIndex].src;

let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let sliderNumber = document.getElementById("slider-number");
let sliderImageCaption = document.getElementById("slider-image-caption");

nextButton.addEventListener("click", goToNextImage);
prevButton.addEventListener("click", goToPreviousImage);

function changeSliderImageCaption() {
  sliderImageCaption.textContent = images[currentIndex].caption;
}

function changeSliderNumber() {
  sliderNumber.textContent = `${currentIndex + 1} / ${images.length}`;
}

function goToNextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  sliderImage.src = images[currentIndex].src;
  changeSliderNumber();
  changeSliderImageCaption();
}

function goToPreviousImage() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1;
  }
  sliderImage.src = images[currentIndex].src;
  changeSliderNumber();
  changeSliderImageCaption();
}

changeSliderNumber();
changeSliderImageCaption();
function getAllProducts() {
  console.log("start fetch all products");

  xhr.open("GET", baseUrl + "products");
  xhr.setRequestHeader("x-api-key", "reqres_cd33070a583d42c8904e237df7a265b0");
  xhr.send();
}
let products = [];
xhr.addEventListener("readystatechange", function () {
  let data;
  if (xhr.readyState == 4 && xhr.status == 200) {
    let response = JSON.parse(xhr.response);
    data = response.data;
    console.log(data);

    data.forEach((user) => {
      user.quantity = 1;
      products.push(user);
    });
    createProductCards();
  }
});
console.log("products are :", products); // why this print first???

if (!localStorage.getItem("Cart")) {
  localStorage.setItem("Cart", "[]");
}
let productListElement = document.getElementById("products-list");

function createProductCards() {
  for (let i = 0; i < products.length; i++) {
    productListElement.innerHTML += `
  <div class="product-card">
    <img id="product-image" src="../assets/images/7889361.jpg">
    <button class="show-details-btn" onclick="goToDetails(${products[i].id})">
      <i class="fas fa-eye"></i> Show Details
    </button>
    <div id="product-card-actions">
      <div class="product-info">
        <p id="product-name">${products[i].name}</p>
        <p id="product-price">200$</p>
      </div>
      <button class="add-to-cart-button" onclick="addToCart('${products[i].id}', 1)">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </div>
`;
  }
}
window.onload = function () {
  getAllProducts();
};

function addToCart(productId, quantity = 1) {
  console.log("start add to cart");

  const rawCart = localStorage.getItem("Cart");
  console.log("cart is", rawCart);
  let cart = rawCart ? JSON.parse(rawCart) : [];
  console.log("cart is", rawCart);
  let currentItem = cart.find(function (item) {
    return productId == item.id;
  });
  console.log("item is", currentItem);
  if (currentItem) {
    currentItem.quantity += quantity;
    console.log("done from current");
  } else {
    let newCartItem = products.find(function (item) {
      return productId == item.id;
    });
    console.log(newCartItem);

    cart.push(newCartItem);
    console.log("done from first");
  }

  localStorage.setItem("Cart", JSON.stringify(cart));
}

function goToDetails(productId) {
  let PID =Number(productId);
  window.location.href = `./details.html?id=${PID}`;
}
