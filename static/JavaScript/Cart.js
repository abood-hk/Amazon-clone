const cart=document.querySelector(".js-Cart");
const productsHTML=document.querySelector(".js-products");
const products=[
  {
    id:1,
    name:"Amazon Astro",
    description:"Household robot for home monitoring, with Alexa.",
    price:20.99,
    image:"/images/RobotProduct.jpeg"
  },
  {
    id:2,
    name:"Echo & Alexa Devices",
    description:"Play music, control your smart home, get information, and more using just your voice.",
    price:17.45,
    image:"/images/alexaDevice.jpg"
  },
  {
    id:3,
    name:"Smart Home",
    description:"Create a smart and connected home with Alexa and products from Amazon.",
    price:14.13,
    image:"/images/tabletProduct.jpg"
  },
  {
    id:4,
    name:"Amazon Kids",
    description:"Devices and content designed just for kids to safely learn, grow and explore.",
    price:30.87,
    image:"/images/kidsProduct.png"
  },
  {
    id:5,
    name:"Kindle E-readers",
    description:"The best devices for reading and writing, period. Hold thousands of books with no screen glare.",
    price:25.32,
    image:"/images/notbookProduct.png"
  },
  {
    id:6,
    name:"Home Security from Amazon",
    description:"Protect your entire home with security systems and cameras from Amazon.",
    price:32.12,
    image:"/images/speakerProduct.jpeg"
  },
  {
    id:7,
    name:"Fire TV",
    description:"Stream over 1.5 Million TV episodes and movies. Watch favorites from Netflix, Prime Video, Disney+, Max , and more.",
    price:57.45,
    image:"/images/fireTv.png"
  },
  {
    id:8,
    name:"Fire Tablets",
    description:"Powerful tablets designed for entertainment—at an affordable price.",
    price:21.75,
    image:"/images/tablets.jpeg"
  },
  {
    id:9,
    name:"Amazon Luna",
    description:"Play games like you stream movies. Luna is a cloud gaming service that lets you play games on devices you already own.",
    price:56.39,
    image:"/images/controller.jpeg"
  },
];
const extraItems=JSON.parse(localStorage.getItem("extraItems"))||products.slice();
const checkoutItems=JSON.parse(localStorage.getItem("cartItems"))||[];
const cartProducts=cartItems;
let extraProducts=extraItems;
let totalPrice=0.00;
let totalItem=0;
let filteredProducts=extraProducts.slice();
function updateCartPro(){
  totalPrice=0.00;
  totalItem=0;
  let cartProductHTML="";
  cartProducts.forEach((cProduct,index)=>{
    cartProductHTML+=`
    <div class="CartItem">
      <div id="cartImgCon">
        <img src="${cProduct.image}" alt="">
      </div>
      <div id="meddleElmCon">
      <div>
        <p class="productDisc">${cProduct.name} ${cProduct.description}</p>
      </div>
      <div>
        <p id="avaibalityText" class="smallText">
          In Stock
        </p>
        <p class="meddleSizeText">
          FREE International Returns
        </p>
      </div>
    <div class="removeButton">
      <p class="red">$${cProduct.price}</p>
      <button class="js-RemoveButton">
        Remove From Cart
      </button>
    </div>
  </div>
</div>`;
totalPrice=((cProduct.price*100)+(totalPrice*100))/100;
totalItem+=1;
totalHTML.forEach((total,index)=>{
  if(totalItem==1){
    total.innerHTML=`Subtotal (${totalItem} item): <b class="red">$${totalPrice.toFixed(2)}</b>`
    }
    else{
       total.innerHTML=`Subtotal (${totalItem} items): <b class="red">$${totalPrice.toFixed(2)}</b>`
    }
  }
)
  }
)
totalHTML.forEach((total,index)=>{
  if(totalItem==1){
    total.innerHTML=`Subtotal (${totalItem} item): <b class="red">$${totalPrice.toFixed(2)}</b>`
    }
    else{
       total.innerHTML=`Subtotal (${totalItem} items): <b  class="red">$${totalPrice.toFixed(2)}</b>`
    }
  }
)
localStorage.setItem("extraItems",JSON.stringify(extraProducts));
localStorage.setItem("cartItems",JSON.stringify(cartProducts));
cart.innerHTML=cartProductHTML;
const removeBtnHtmL=document.querySelectorAll(".js-RemoveButton");
function updateButtons(){
removeBtnHtmL.forEach((button,index)=>{
   button.addEventListener("click",()=>{
      extraProducts.push(cartProducts[index]);
      filteredProducts=extraProducts;
      updateFilteredProducts();
      cartProducts.splice(index,1);
      updateCartPro();
      updateExtraPro();
      updateNumber();
   }
  )
});
}
setInterval(updateButtons(),100);
};
function updateExtraPro(){
  let extraProductsHTML="";
  filteredProducts.forEach((eProduct,index)=>{
  extraProductsHTML+=`
<div class="js-Product" id="product"> 
 <a href="#">
    <img src="${eProduct.image}" alt="">
    <h4>
      ${eProduct.name}
    </h4>
    <p>
      ${eProduct.description}
    </p>
  </a>
  <div class="cartSec">
  <button class="js-cartButton">
    Add To Cart
  </button>
  <p class="red">
    $${eProduct.price}
  </p>
</div> 
</div>
`; 
}
)
localStorage.setItem("extraItems",JSON.stringify(extraProducts));
localStorage.setItem("cartItems",JSON.stringify(cartProducts));
productsHTML.innerHTML=extraProductsHTML;
const addToCart=document.querySelectorAll(".js-cartButton");
function updateButtons1(){
addToCart.forEach((button,index)=>{
  button.addEventListener("click",()=>{
    cartProducts.push(filteredProducts[index]);
    filteredProducts.splice(index,1);
    let include=false;
    extraProducts=products.filter((product)=>{
      include=false;
      cartProducts.forEach((cProduct)=>{
        if(cProduct.id===product.id){
          include=true;
        }
      });
      if(!include){
        return product;
      }
    });
    updateExtraPro();
    updateCartPro();
    updateNumber();
    }
  );
});
}
setInterval(updateButtons1(),100);
};
const totalHTML=document.querySelectorAll(".js-Total");
const ItemsInCart=document.querySelector(".js-NumberCart");
function updateNumber() {
  ItemsInCart.innerHTML=cartProducts.length;  
}
function updateFilteredProducts(){
  filteredProducts=extraProducts.filter((eProduct)=>{
    if(eProduct.name.toLowerCase().includes(searchBar.value.trim().toLowerCase())){
      return eProduct;
    }
  })
}
  searchBar.addEventListener("input",()=>{
    updateFilteredProducts();
    updateExtraPro();
    updateCartPro();
    updateNumber(); 
  })

updateFilteredProducts();
updateNumber();
updateCartPro();
updateExtraPro();
const productHTML=document.querySelectorAll(".js-Product");
localStorage.setItem("extraItems",JSON.stringify(extraProducts));
localStorage.setItem("cartItems",JSON.stringify(cartProducts));
