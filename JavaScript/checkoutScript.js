const checkoutItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const checkOutProducts = document.querySelector(".js-SummaryProducts");
const summary = document.querySelector(".js-Summary");
const products = [
  {
    id: 1,
    name: "Amazon Astro",
    description: "Household robot for home monitoring, with Alexa.",
    price: 20.99,
    image: "../images/RobotProduct.jpeg",
  },
  {
    id: 2,
    name: "Echo & Alexa Devices",
    description:
      "Play music, control your smart home, get information, and more using just your voice.",
    price: 17.45,
    image: "../images/alexaDevice.jpg",
  },
  {
    id: 3,
    name: "Smart Home",
    description:
      "Create a smart and connected home with Alexa and products from Amazon.",
    price: 14.13,
    image: "../images/tabletProduct.jpg",
  },
  {
    id: 4,
    name: "Amazon Kids",
    description:
      "Devices and content designed just for kids to safely learn, grow and explore.",
    price: 30.87,
    image: "../images/kidsProduct.png",
  },
  {
    id: 5,
    name: "Kindle E-readers",
    description:
      "The best devices for reading and writing, period. Hold thousands of books with no screen glare.",
    price: 25.32,
    image: "../images/notbookProduct.png",
  },
  {
    id: 6,
    name: "Home Security from Amazon",
    description:
      "Protect your entire home with security systems and cameras from Amazon.",
    price: 32.12,
    image: "../images/speakerProduct.jpeg",
  },
  {
    id: 7,
    name: "Fire TV",
    description:
      "Stream over 1.5 Million TV episodes and movies. Watch favorites from Netflix, Prime Video, Disney+, Max , and more.",
    price: 57.45,
    image: "../images/fireTv.png",
  },
  {
    id: 8,
    name: "Fire Tablets",
    description:
      "Powerful tablets designed for entertainment—at an affordable price.",
    price: 21.75,
    image: "../images/tablets.jpeg",
  },
  {
    id: 9,
    name: "Amazon Luna",
    description:
      "Play games like you stream movies. Luna is a cloud gaming service that lets you play games on devices you already own.",
    price: 56.39,
    image: "../images/controller.jpeg",
  },
];
let extraItems = [];
function updateExtraItems() {
  extraItems = products.filter((product, index) => {
    let include = false;
    checkoutItems.forEach((item, index) => {
      if (item.id === product.id) {
        include = true;
      }
    });
    if (!include) {
      return product;
    }
  });
}
updateExtraItems();
let items = 0;
let price = 0;
let totalShipping = 0;
let choosePrice = [];
const date = [
  {
    day: `${dayjs().add(7, "day").format("dddd, MMMM D")}`,
    price: 0.0,
  },
  {
    day: `${dayjs().add(4, "day").format("dddd, MMMM D")}`,
    price: 4.99,
  },
  {
    day: `${dayjs().add(1, "day").format("dddd, MMMM D")}`,
    price: 9.99,
  },
];
function updateCheckoutItems() {
  let checkOutProductsHTML = "";
  items = 0;
  price = 0;
  checkoutItems.forEach((item, index) => {
    checkOutProductsHTML += `
  <div class="summaryProduct">
  <h3 class="js-DeliveryDate">
    Delivery date: ${date[0].day}
  </h3>
  <div class="summaryProductContent">
  <div class="productContainer">
<img src="${item.image}" alt="">
<div>
<p class="Description">${item.name} ${item.description}</p>
<p class="productPrice">$${item.price}</p>
<button class="js-RemoveItem">Remove Item</button>
</div>
</div>
<div class="chooseDate">
<h4>Choose a delivery option:</h4>
<label  for="">
<input type="radio" checked name="date${index}" value="${date[0].day}">
<div>
<p class="chooseDay">${date[0].day}</p>
<p class="choosePrice">FREE Shipping</p>
</div>
</label>
<label for="">
  <input type="radio" name="date${index}" value="${date[1].day}">
    <div>
    <p class="chooseDay">${date[1].day}</p>
    <p class="choosePrice">$${date[1].price} - Shipping</p>
  </div>
</label>
<label for="">
  <input type="radio" name="date${index}" value="${date[2].day}">
  <div>
  <p class="chooseDay">${date[2].day}</p>
  <p class="choosePrice">$${date[2].price} - Shipping</p>
</div>
</label>
</div>
</div>
</div>
`;

    items += 1;
    price = (item.price * 100 + price * 100) / 100;
  });
  checkOutProducts.innerHTML = checkOutProductsHTML;
  updateSummary();

  const removeButtons = document.querySelectorAll(".js-RemoveItem");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      checkoutItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(checkoutItems));
      updateCheckoutItems();
      updateNumber();
      updateExtraItems();
      checkNumber();
      localStorage.setItem("extraItems", JSON.stringify(extraItems));
    });
  });
}
function updateSummary() {
  totalShipping = 0;
  choosePrice.forEach((cPrice, index) => {
    totalShipping = parseFloat(
      ((cPrice * 100 + totalShipping * 100) / 100).toFixed(2)
    );
  });
  let beforeTax = parseFloat(
    ((price * 100 + totalShipping * 100) / 100).toFixed(2)
  );
  let tax = parseFloat(((price * 100 + totalShipping * 100) / 1000).toFixed(2));
  summary.innerHTML = `
<h3>Order Summary</h3>
<div class="entireSummary">
<div class="infoSummary">
<p>Items (${items}):</p>
<p>Shipping & handling</p>
<p>Total before tax:</p>
<p>Estimated tax (10%):</p>
</div>
<div class="priceSummary">
<p>$${price.toFixed(2)}</p>
<p>$${totalShipping.toFixed(2)}</p>
<p>$${beforeTax.toFixed(2)}</p>
<p>$${tax.toFixed(2)}</p>
</div>
</div>
<div class="totalSummary">
<p>Order total:</p>
<p>$${((beforeTax * 100 + tax * 100) / 100).toFixed(2)}</p>
</div>
<button class="js-OrderButton">Place Your Order</button>
`;
  order();
}
updateCheckoutItems();
const DeliveryDate = document.querySelectorAll(".js-DeliveryDate");
function updateDeleveryTime() {
  checkoutItems.forEach((item, index) => {
    const chooseDate = document.querySelectorAll(`input[name="date${index}"]`);
    chooseDate.forEach((button) => {
      button.addEventListener("change", (event) => {
        DeliveryDate[index].innerHTML = "Delivery date: " + event.target.value;
        if (event.target.value === date[0].day) {
          choosePrice[index] = 0.0;
          updateSummary();
        } else if (event.target.value === date[1].day) {
          choosePrice[index] = 4.99;
          updateSummary();
        } else if (event.target.value === date[2].day) {
          choosePrice[index] = 9.99;
          updateSummary();
        }
      });
    });
  });
}
function order() {
  const OrderButton = document.querySelector(".js-OrderButton");
  OrderButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "Thanks.html";
  });
}
const ItemsInCart = document.querySelector(".js-NumberCart");

function checkNumber() {
  if (checkoutItems.length === 1) {
    checkOutProducts.classList.add("js-ProductsBottom");
  }
  if (checkoutItems.length === 0) {
    document.body.innerHTML = `<div class="Empty">
  <h2>Your Cart Is Unfortunately Empy</h2>
  <h3>Would you Like To Add Items To It?</h3>
  <a href="index.html">
  <button>Go Back To Home Page</button>
  </a>
  </div>`;
  }
}
checkNumber();
function updateNumber() {
  ItemsInCart.innerHTML = checkoutItems.length;
}
updateNumber();
updateDeleveryTime();
localStorage.setItem("cartItems", JSON.stringify(checkoutItems));
