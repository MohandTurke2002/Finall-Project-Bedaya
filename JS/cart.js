import { setValuesElement } from "./functions.js";

let products;
if (localStorage.productArray) {
  products = JSON.parse(localStorage.productArray);
}

let parentElement = document.querySelector("#product-container");

const createGameCard = (
  id,
  image,
  name,
  arrayType,
  rate,
  price,
  avatar,
  userName,
  arrayPlatform
) => {
  parentElement.innerHTML += `
  <div class="card-game" id=${id}>
    <div class="media-wrapper">
      <img src=${image} alt=${name}>
      <video src="../images/game play video.mp4" id=video-${id} muted loop ></video>
    </div>
    <div class="describe">
      <h3>${name}</h3>
      <p>${arrayType[0]?.name}/${arrayType[1]?.name}</p>
    </div>
    <div class="rate-price">
      <div class="rate-wrapper">
        <span>${rate}</span>
        <i class="fa-solid fa-star"></i>
      </div>
      <span>$${price}</span>
    </div>
    <div class="usr-plat">
      <div class="user-image">
        <img src=${avatar} alt=${userName} >
      </div>
      <div class="platform-icon">
          ${arrayPlatform.slice(0, 3).map(({ platform }) => {
            if (platform.name === "PC") {
              return `<i class="fa-brands fa-windows"></i>`;
            } else if (platform.name === "PlayStation") {
              return `<i class="fa-brands fa-playstation"></i>`;
            } else if (platform.name === "Xbox") {
              return `<i class="fa-brands fa-xbox"></i>`;
            }
          })}
      </div>
    </div>
    <div class="cart-fav-container">
      <button class="remove-cart" id=${id}>remove from cart</button>
    </div>
  </div>
  `;
  removeProduct();
};

// create remove from cart
const removeProduct = () => {
  let removeBtn = document.querySelectorAll(".remove-cart");
  console.log();
  const getObject = (idValue) => {
    for (let i = 0; i < products.length; i++) {
      if (`${products[i].id}`.includes(`${idValue}`)) {
        products.splice(i, 1);
        localStorage.setItem("productArray", JSON.stringify(products));
        location.reload();
      }
    }
  };
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.target.id));
  });
};

// create function to sub total
const getTotalPrice = () => {
  let total = 0;
  products.map(({ price }) => {
    total += price;
    return total;
  });
  document.querySelector("#total").innerHTML = `$${total}`;
};
getTotalPrice();

setValuesElement(products, createGameCard);
