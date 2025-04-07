const cart=document.querySelector(".js-Cart");
const productsHTML=document.querySelector(".js-products");
class Product{
  id;
  name;
  description;
  price;
  image;
  constructor(id,name,description,price,image){
    this.id=id;
    this.name=name;
    this.description=description;
    this.price=price;
    this.image=image;
  };
}
const products=[
  new Product(1,"Amazon Astro","Household robot for home monitoring, with Alexa.",20.99,"../images/RobotProduct.jpeg"),

  new Product(2,"Echo & Alexa Devices","Play music, control your smart home, get information, and more using just your voice.",17.45,"../images/alexaDevice.jpg"),

  new Product(3,"Smart Home","Create a smart and connected home with Alexa and products from Amazon.",14.13,"../images/tabletProduct.jpg"),

  new Product(4,"Amazon Kids","Devices and content designed just for kids to safely learn, grow and explore.",30.87,"../images/kidsProduct.png"), 
  
  new Product(5,"Kindle E-readers","The best devices for reading and writing, period. Hold thousands of books with no screen glare.",25.32,"../images/notbookProduct.png"),

  new Product(6,"Home Security from Amazon","Protect your entire home with security systems and cameras from Amazon.",32.12,"../images/speakerProduct.jpeg"),

  new Product(7,"Fire TV","Stream over 1.5 Million TV episodes and movies. Watch favorites from Netflix, Prime Video, Disney+, Max , and more.",57.45,"../images/fireTv.png"),
  
  new Product(8,"Fire Tablets","Powerful tablets designed for entertainment—at an affordable price.",21.75,"../images/tablets.jpeg"),
   
  new Product(9,"Amazon Luna","Play games like you stream movies. Luna is a cloud gaming service that lets you play games on devices you already own.",56.39,"../images/controller.jpeg"),
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
  <p class="red">
    $${eProduct.price}
  </p>
  <button class="js-cartButton">
    Add To Cart
  </button>
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
