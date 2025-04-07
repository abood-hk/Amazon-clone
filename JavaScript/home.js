const productsDisplay = document.querySelector(".js-Products");
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
let extraProducts = [];
function updateExtraProducts() {
  extraProducts = products.filter((product, index) => {
    let include = false;
    cartItems.forEach((cproduct, index) => {
      if (product.id == cproduct.id) {
        include = true;
      }
    });
    return !include;
  });
  localStorage.setItem("extraItems", JSON.stringify(extraProducts));
}
updateExtraProducts();
let productsDisplayHTML = "";
let filteredProducts = products.slice();
function updateDisplayProducts() {
  productsDisplayHTML = "";
  filteredProducts.forEach((product, index) => {
    productsDisplayHTML += `
<div class="product">
  <div class="productImgCon">  
<img class="productImg" src="${product.image}" alt="">
</div>
<h3>
  ${product.name}
</h3>
<p>
  ${product.description}
</p>
<p id="price">
  $${product.price}
</p>
`;
    let include = false;
    cartItems.forEach((cproduct, i) => {
      if (filteredProducts[index].id === cproduct.id) {
        include = true;
      }
    });
    if (!include) {
      productsDisplayHTML += `
<button class="js-AddToCart">Add To Cart</button>
</div>
`;
    } else if (include) {
      productsDisplayHTML += `
  <button class="js-AddToCart">Remove From Cart</button>
  </div>
  `;
    }
  });
  productsDisplay.innerHTML = productsDisplayHTML;
  updateButtons();
}
updateDisplayProducts();
setInterval(updateButtons(), 100);
function updateButtons() {
  const buttons = document.querySelectorAll(".js-AddToCart");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let include = false;
      let place = 0;
      cartItems.forEach((cproduct, i) => {
        if (filteredProducts[index].id === cproduct.id) {
          include = true;
          place = cproduct.id;
        }
      });
      if (!include) {
        cartItems.push(filteredProducts[index]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateNumber();
        updateExtraProducts();
        button.innerHTML = "Remove From Cart";
      } else if (include) {
        let carttItems = cartItems.filter((product) => product.id !== place);
        localStorage.setItem("cartItems", JSON.stringify(carttItems));
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
        updateNumber();
        updateExtraProducts();
        button.innerHTML = "Add To Cart";
      }
    });
  });
}
updateButtons();
const ItemsInCart = document.querySelector(".js-NumberCart");
function updateNumber() {
  ItemsInCart.innerHTML = cartItems.length;
}
updateNumber();
searchBar.addEventListener("input", (event) => {
  filteredProducts = products.filter((product, index) => {
    if (
      product.name.toLowerCase().includes(searchBar.value.trim().toLowerCase())
    ) {
      return product;
    }
  });
  updateExtraProducts();
  updateDisplayProducts();
});
