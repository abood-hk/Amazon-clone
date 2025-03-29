const burgerMenu=document.querySelector(".js-burgerMenu");
const sideMenu=document.querySelector(".js-sideMenu");
let slide=false;
burgerMenu.addEventListener("click",()=>{
if(!slide){
  sideMenu.classList.add("slideRight");
  slide=true;
}
else if(slide){
  sideMenu.classList.remove("slideRight");
  slide=false;
}
}
);