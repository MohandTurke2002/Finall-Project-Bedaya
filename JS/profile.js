import {
  isExists,
  setValuesElement,
  setValuesInElements,
  animateAddFavIcon,
  animateVideoGame,
} from "./functions.js";

let userInfo;
if (isExists) {
  userInfo = JSON.parse(localStorage.user);
}
let { email, nameOfUser, userName } = userInfo;
document.querySelector(".user-name").textContent = nameOfUser;
document.querySelector(".user-email").textContent = email;
document.querySelector(".user-id").textContent = userName;

let favorite;
if (localStorage.itemArray) {
  favorite = JSON.parse(localStorage.itemArray);
}

// create Elements
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
  let parentElement = document.querySelector("#items-wrapper");
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
      <button class="add-cart" id=${id}>add to cart</button>
      <button class="add-fav" id=${id}><i class="bx bx-heart" id="addToFav"></i></button>
    </div>
  </div>
  `;

  animateAddFavIcon();
  animateVideoGame();
  addToCard();
  removeProduct();
};

// add to cart
const addToCard = () => {
  let productArray;
  if (localStorage.productArray) {
    productArray = JSON.parse(localStorage.productArray);
  }
  let addBtn = document.querySelectorAll(".add-cart");
  const getObject = (idValue) => {
    for (let i = 0; i < favorite.length; i++) {
      if (`${favorite[i].id}`.includes(`${idValue}`)) {
        productArray.push(favorite[i]);
        return localStorage.setItem(
          "productArray",
          JSON.stringify(productArray)
        );
      }
    }
  };
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.target.id));
  });
};

// create remove from favorite
const removeProduct = () => {
  let removeBtn = document.querySelectorAll(".add-fav");
  console.log();
  const getObject = (idValue) => {
    for (let i = 0; i < favorite.length; i++) {
      if (`${favorite[i].id}`.includes(`${idValue}`)) {
        favorite.splice(i, 1);
        localStorage.setItem("itemArray", JSON.stringify(favorite));
        location.reload();
      }
    }
  };
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.currentTarget.id));
  });
};

setValuesElement(favorite, createGameCard);

let friends;
if (localStorage.friendArray) {
  friends = JSON.parse(localStorage.friendArray);
}

// create Elements
const createMemberCard = (id, avatar, userName, userId) => {
  let membersContainer = document.querySelector("#member-wrapper");
  membersContainer.innerHTML += `
  <div class="card-member" id=${id}>
    <div class="avatar-container">
      <div class="avatar-image">
        <img src=${avatar} alt=${userName}>
      </div>
    </div>
    <div class="user-info-wrapper">
      <h3>${userName}</h3>
      <p>${userId}</p>
    </div>
    <div class="add-friend-wrapper">
      <button class="remove-friend" id=${id}>Add Friend <i class="bx bx-user-plus"></i></button>
    </div>
  </div>
  `;
  removeFriend();
};

// create remove from cart
const removeFriend = () => {
  let removeBtn = document.querySelectorAll(".remove-friend");
  console.log();
  const getObject = (idValue) => {
    for (let i = 0; i < friends.length; i++) {
      if (`${friends[i].id}`.includes(`${idValue}`)) {
        friends.splice(i, 1);
        localStorage.setItem("friendArray", JSON.stringify(friends));
        location.reload();
      }
    }
  };
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.target.id));
  });
};

// create log out function
const logOut = () => {
  if (isExists) {
    localStorage.removeItem("user");
  }
  location.replace("/", "/");
};
let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", logOut);

// set values form main object in elements
setValuesInElements(friends, createMemberCard);
