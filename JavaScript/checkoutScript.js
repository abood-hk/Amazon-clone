const checkoutItems=JSON.parse(localStorage.getItem("cartItems"))||[];
const checkOutProducts=document.querySelector(".js-SummaryProducts");
const summary=document.querySelector(".js-Summary");
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
let extraItems=[];
function updateExtraItems(){
extraItems=products.filter((product,index)=>{
  let include=false; 
  checkoutItems.forEach((item,index)=>{
    if(item.id===product.id){
      include=true;
    }
  });
  if(!include){
    return product;
  }
});
}
updateExtraItems();
let items=0;
let price=0;
let totalShipping=0;
let choosePrice=[];
const date=[
  {
    day:`${dayjs().add(7,"day").format("dddd, MMMM D")}`,
    price:0.00
  },
  {
    day:`${dayjs().add(4,"day").format("dddd, MMMM D")}`,
    price:4.99
  },
  {
    day:`${dayjs().add(1,"day").format("dddd, MMMM D")}`,
    price:9.99
  }
];
function updateCheckoutItems(){
let checkOutProductsHTML="";
items=0;
price=0;
checkoutItems.forEach((item,index)=>{
  checkOutProductsHTML+=`
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
`

items+=1;
price=((item.price*100)+(price*100))/100;
});
checkOutProducts.innerHTML=checkOutProductsHTML;
updateSummary();

const removeButtons = document.querySelectorAll(".js-RemoveItem");
  removeButtons.forEach((button,index)=>{
   button.addEventListener("click",()=>{
     checkoutItems.splice(index,1);
     localStorage.setItem("cartItems",JSON.stringify(checkoutItems));
     updateCheckoutItems();
     updateNumber();
     updateExtraItems();
     checkNumber();
     localStorage.setItem('extraItems',JSON.stringify(extraItems));
   }
  );
  }
);
};
function updateSummary(){
  totalShipping=0;
  choosePrice.forEach((cPrice,index)=>{
    totalShipping=parseFloat((((cPrice*100)+(totalShipping*100))/100).toFixed(2));
  }
);
let beforeTax=parseFloat((((price*100)+(totalShipping*100))/100).toFixed(2));
let tax=parseFloat((((price*100)+(totalShipping*100))/1000).toFixed(2));
summary.innerHTML=`
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
<p>$${(((beforeTax*100)+(tax*100))/100).toFixed(2)}</p>
</div>
<button class="js-OrderButton">Place Your Order</button>
`
order();
}
updateCheckoutItems();
const DeliveryDate=document.querySelectorAll(".js-DeliveryDate");
function updateDeleveryTime(){
checkoutItems.forEach((item,index)=>{
const chooseDate=document.querySelectorAll(`input[name="date${index}"]`);
chooseDate.forEach((button)=>{
  button.addEventListener("change",(event)=>{
    DeliveryDate[index].innerHTML=("Delivery date: "+event.target.value);
    if(event.target.value===date[0].day){
      choosePrice[index]=0.00;
      updateSummary();
    }
    else if(event.target.value===date[1].day){
      choosePrice[index]=4.99;
      updateSummary();
    }
    else if(event.target.value===date[2].day){
      choosePrice[index]=9.99;
      updateSummary();
    }
  }
);
}
)}
);};
function order(){
const OrderButton=document.querySelector(".js-OrderButton");
OrderButton.addEventListener("click",()=>{
localStorage.clear();
window.location.href="Thanks.html";
})
};
const ItemsInCart=document.querySelector(".js-NumberCart");

function checkNumber(){
if(checkoutItems.length===1){
  checkOutProducts.classList.add("js-ProductsBottom");
};
if(checkoutItems.length===0){
  document.body.innerHTML=`<div class="Empty">
  <h2>Your Cart Is Unfortunately Empy</h2>
  <h3>Would you Like To Add Items To It?</h3>
  <a href="index.html">
  <button>Go Back To Home Page</button>
  </a>
  </div>`
}
}
checkNumber();
function updateNumber() {
  ItemsInCart.innerHTML=checkoutItems.length;  
}
updateNumber();
updateDeleveryTime();
localStorage.setItem("cartItems",JSON.stringify(checkoutItems));