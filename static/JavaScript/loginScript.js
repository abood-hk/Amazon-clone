const logeInBtn=document.querySelector(".js-LogeInBtn");
const emailBox=document.querySelector(".js-Email");
const passwordBox=document.querySelector(".js-Password")
const invalidPass=document.querySelector(".js-InvalidPassword");
const invalidEmail=document.querySelector(".js-InvalidEmail");
const eye=document.querySelector(".js-Eye");
const form=document.querySelector(".js-Form");
form.addEventListener("submit",(event)=>{
event.preventDefault();
})
emailBox.value="";
passwordBox.value="";
eye.addEventListener("mousedown",()=>{
  passwordBox.type = "text";
});
eye.addEventListener("mouseup",()=>{
passwordBox.type="password";
});
logeInBtn.addEventListener("click",()=>{
  if(emailBox.value.includes("@")&&passwordBox.value.length>8){
  window.location.href="index.html";
  }
  else if(emailBox.value.includes("@")&&passwordBox.value.length<=8){
    invalidPass.classList.add("show");
    setTimeout(()=>{invalidPass.classList.remove("show");},1500)
  }
  else if(!emailBox.value.includes("@")&&passwordBox.value.length>8){
    invalidEmail.classList.add("show");
    setTimeout(()=>{invalidEmail.classList.remove("show");},1500)
  }
  else if(!emailBox.value.includes("@")&&passwordBox.value.length<=8){
    invalidEmail.classList.add("show");
    setTimeout(()=>{invalidEmail.classList.remove("show");},1500)
    invalidPass.classList.add("show");
    setTimeout(()=>{invalidPass.classList.remove("show");},1500)
  }
});
document.body.addEventListener("keydown",(event)=>{
   if(event.key==="Enter"){
    logeInBtn.click();
   }
});
