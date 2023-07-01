import { isExists } from "../JS/functions.js";

const headerElement = document.createElement("template");
headerElement.innerHTML = `
  <header class="nav-bar" id="nav">
    <div class="logo">
      <div class="img">
        <img src="../images/logo.png" alt="logo" />
      </div>
      <div class="main-title">
        <h1>fireshot</h1>
      </div>
    </div>
    <div class="pages-links" id="nav-links">
      <ul>
        <li>
          <a href="/" class="links-pages" id="links-pages">
            <div class="icon">
              <i class='bx bx-home-alt-2'></i>
            </div>
            <div class="link" id="link">
              <p class="link-para">home</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/pages/shop.html" class="links-pages" id="links-pages">
            <div class="icon">
              <i class='bx bx-store' ></i>
            </div>
            <div class="link" id="link">
              <p class="link-para">shop</p>
            </div>
          </a>
        </li>
        <li>
          <a href="/pages/members.html" class="links-pages" id="links-pages">
            <div class="icon">
              <i class='bx bx-group'></i>
            </div>
            <div class="link" id="link">
              <p class="link-para">members</p>
            </div>
          </a>
        </li>
        <li>
          <a href="../pages/cart.html" class="links-pages" id="links-pages">
            <div class="icon">
            <i class='bx bx-cart-alt'></i>
            </div>
            <div class="link" id="link">
              <p class="link-para">cart</p>
            </div>
          </a>
        </li>
        <li class="log-to-user">
        </li>
      </ul>
    </div>
    <div class="user-box">
      <div class="mode-theme" id="mode-theme">
        <i class='bx bx-sun sun' ></i>
        <input type="checkbox" name="theme" id="theme" />
        <i class='bx bx-moon moon' ></i>
      </div>
    </div>
    <button class="toggle-nav">
      <i class="bx bx-menu"></i>
    </button>
  </header>
`;

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = headerElement.innerHTML;
  }
}

customElements.define("custom-header", Header);

const inputTheme = document.querySelector("#theme");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

const darkMode = () => {
  document.body.classList.add("dark");
  inputTheme.checked = true;
  sun.classList.add("hide");
  moon.classList.add("show");
  localStorage.setItem("mode", "dark");
};

const lightMode = () => {
  document.body.classList.remove("dark");
  inputTheme.checked = false;
  sun.classList.remove("hide");
  moon.classList.remove("show");
  localStorage.setItem("mode", "light");
};

if (localStorage.getItem("mode") == "dark") {
  darkMode();
} else {
  lightMode();
}

inputTheme.addEventListener("change", function () {
  if (inputTheme.checked) {
    darkMode();
  } else {
    lightMode();
  }
});

// toggle nav bar
let toggleBtn = document.querySelector(".toggle-nav");
let navLinks = document.querySelector("#nav-links");
const showNavBar = () => {
  navLinks.classList.toggle("show");
};
toggleBtn.addEventListener("click", showNavBar);

// change nav-bar from log in to profile user
const changeNavBar = () => {
  let link = document.querySelector(".log-to-user");
  if (isExists) {
    link.innerHTML = `
      <a href="../pages/profile.html" class="links-pages" id="links-pages">
        <div class="icon">
          <i class='bx bx-user'></i>
        </div>
        <div class="link" id="link">
          <p class="link-para">profile</p>
        </div>
      </a>
    `;
  } else {
    link.innerHTML = `
    <a href="../pages/login.html" class="links-pages" id="links-pages">
      <div class="icon">
        <i class='bx bx-log-in-circle'></i>
      </div>
      <div class="link" id="link">
        <p class="link-para">log in</p>
      </div>
    </a>
  `;
  }
};

changeNavBar();
