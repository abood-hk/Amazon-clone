const burgerMenu=document.querySelector(".js-burgerMenu");
const sideMenu=document.querySelector(".js-sideMenu");
const overlay=document.querySelector(".js-overlay");
const searchBar=document.querySelector("#searchBar")
let cartItems=JSON.parse(localStorage.getItem("cartItems"))||[];
let slide=false;
burgerMenu.addEventListener("click",()=>{
  sideMenu.classList.add("slideRight");
  overlay.classList.add("show");
  setTimeout(()=>{slide=true},1);
});
document.addEventListener("click",(event)=>{
    if(slide&&!sideMenu.contains(event.target)){
      sideMenu.classList.remove("slideRight");
      overlay.classList.remove("show");
      setTimeout(()=>{slide=false},10);
    }
});

