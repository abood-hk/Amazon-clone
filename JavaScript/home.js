const productsDisplay=document.querySelector('.js-Products');
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
let extraProducts=[];
function updateExtraProducts(){
extraProducts=products.filter((product,index)=>{
let include =false;
cartItems.forEach((cproduct,index)=>{
if(product.id==cproduct.id){
  include=true;
}
})
return !include;
});
localStorage.setItem("extraItems",JSON.stringify(extraProducts))
};
updateExtraProducts();
let productsDisplayHTML="";
let filteredProducts=products.slice();
function updateDisplayProducts(){
productsDisplayHTML="";
filteredProducts.forEach((product,index)=>{
productsDisplayHTML+=`
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
`
let include=false;
cartItems.forEach((cproduct,i)=>{
  if(filteredProducts[index].id===cproduct.id){
    include=true;
  }
})
if (!include) {
  productsDisplayHTML+=`
<button class="js-AddToCart">Add To Cart</button>
</div>
`     
}
else if(include){
  productsDisplayHTML+=`
  <button class="js-AddToCart">Remove From Cart</button>
  </div>
  `
}
});
productsDisplay.innerHTML=productsDisplayHTML;
updateButtons();
};
updateDisplayProducts();
setInterval(updateButtons(),100);
function updateButtons(){
  const buttons=document.querySelectorAll(".js-AddToCart");
buttons.forEach((button,index)=>{
  button.addEventListener("click",()=>{
    let include=false;
    let place=0;
    cartItems.forEach((cproduct,i)=>{
      if(filteredProducts[index].id===cproduct.id){
        include=true;
        place=cproduct.id;
      }
    })
    if (!include) {
      cartItems.push(filteredProducts[index]);
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      updateNumber();
      updateExtraProducts();
      button.innerHTML="Remove From Cart";      
    }
    else if(include){
        let carttItems=cartItems.filter(product=>product.id !==place);
        localStorage.setItem("cartItems",JSON.stringify(carttItems));
        cartItems=JSON.parse(localStorage.getItem("cartItems"))
        updateNumber();
        updateExtraProducts();
        button.innerHTML="Add To Cart";
    }
    });
});
}
updateButtons();
const ItemsInCart=document.querySelector(".js-NumberCart");
function updateNumber() {
  ItemsInCart.innerHTML=cartItems.length;  
}
updateNumber();
searchBar.addEventListener("input",(event)=>{
filteredProducts=products.filter((product,index)=>{
  if(product.name.toLowerCase().includes(searchBar.value.trim().toLowerCase())){
    return product;
  }
})
updateExtraProducts();
updateDisplayProducts();
});
