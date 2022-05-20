const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".login-container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
$(window).on("load",function(){
 setTimeout(function(){
      $('.message').addClass("show");
      $('.message').removeClass("hide");
      $('.message').addClass("showAlert");
  },1000);
  
  setTimeout(function(){
    $('.message').removeClass("show");
    $('.message').addClass("hide");
  },3000);
})
