// create function to flip from login to register
let flipBtnCreate = document.querySelector("#create-acc");
let flipParent = document.querySelector("#flip-container");
const toggleFlip = (e) => {
  e.preventDefault();
  flipParent.classList.toggle("register");
};
flipBtnCreate.addEventListener("click", (e) => toggleFlip(e));

// create register from validation
let from = document.querySelector("#register");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let userName = document.querySelector("#user-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let user;
const createUser = (e) => {
  e.preventDefault();
  if (localStorage.user != null) {
    user = JSON.parse(localStorage.user);
  } else {
    user = {
      nameOfUser: `${firstName.value} ${lastName.value}`,
      userName: `@${userName.value}`,
      email: `${email.value}`,
      password: `${password.value}`,
    };
    if (user.userName && user.nameOfUser && user.email && user.password) {
      localStorage.setItem("user", JSON.stringify(user));
      location.replace("/", "/");
    } else {
      console.log("error");
    }
  }
};
from.addEventListener("submit", (e) => createUser(e));
