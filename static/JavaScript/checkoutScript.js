const checkoutItems=JSON.parse(localStorage.getItem("cartItems"))||[];
const checkOutProducts=document.querySelector(".js-SummaryProducts");
const summary=document.querySelector(".js-Summary");
let items=0;
const date=[
  {
    day:"Tuesday, June 21",
    price:0.00
  },
  {
    day:"Wednesday, June 15",
    price:4.99
  },
  {
    day:"Monday, June 13",
    price:9.99
  }
];
function updateCheckoutItems(){
let checkOutProductsHTML="";
items=0;
checkoutItems.forEach((item,index)=>{
  checkOutProductsHTML+=`
  <div class="summaryProduct">
  <h3 class="js-DeliveryDate">
    Delivery date: ${date[2].day}
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
<input type="radio" name="date${index}" value="${date[0].day}">
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
}
);
checkOutProducts.innerHTML=checkOutProductsHTML;
updateSummary();
};
function updateSummary(){
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
<p>$42.75</p>
<p>$4.99</p>
<p>$47.74</p>
<p>$4.77</p>
</div>
</div>
<div class="totalSummary">
<p>Order total:</p>
<p>$52.51</p>
</div>
<button>Place Your Order</button>
`
}
updateCheckoutItems();
const DeliveryDate=document.querySelectorAll(".js-DeliveryDate");
function updateDeleveryTime(){
checkoutItems.forEach((item,index)=>{
const chooseDate=document.querySelectorAll(`input[name="date${index}"]`);
chooseDate.forEach((button)=>{
  button.addEventListener("change",(event)=>{
    DeliveryDate[index].innerHTML=("Delivery date: "+event.target.value);
  }
);
}
)
}
);
};
updateDeleveryTime();