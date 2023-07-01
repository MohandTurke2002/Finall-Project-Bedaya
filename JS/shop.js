// import get user function
import {
  getUsersData,
  animateAddFavIcon,
  animateVideoGame,
  setValuesElement,
  isExists,
} from "./functions.js";

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
  let parentElement = document.querySelector("#sliders-wrapper");
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
    </div>
  </div>
  `;

  addFavCart(id);
  animateAddFavIcon();
  animateVideoGame();
  addToCard();
  addToFav();
};

// create add to cart & fav
const addFavCart = (id) => {
  let parentElement = document.querySelectorAll(".cart-fav-container");
  if (isExists) {
    parentElement.forEach((Element) => {
      Element.innerHTML = `
    <button class="add-cart" id=${id}>add to cart</button>
    <button class="add-fav" id=${id}><i class="bx bx-heart" id="addToFav"></i></button>
    `;
    });
  } else {
    parentElement.forEach((Element) => {
      Element.innerHTML = "";
    });
  }
};

// fetch all games from RAWG API
const getGameData = async () => {
  let arrayGameResult = [];
  let gameData = await fetch(
    "https://api.rawg.io/api/games?key=9c70c85152224dac8f24a72f09805303&3498"
  );
  const jsonGameData = await gameData.json();

  const loopGamesResult = jsonGameData.results.map(
    ({ id, background_image, name, genres, rating, parent_platforms }) =>
      arrayGameResult.push({
        id,
        gameImage: background_image,
        gameName: name,
        gameType: genres,
        gameRate: rating,
        gamePlatform: parent_platforms,
      })
  );
  return arrayGameResult;
};

// create an array of object for price
let arrayPrice = [
  { price: 5 },
  { price: 12 },
  { price: 20 },
  { price: 7 },
  { price: 30 },
  { price: 28 },
  { price: 17 },
  { price: 23 },
  { price: 50 },
  { price: 10 },
  { price: 5 },
  { price: 12 },
  { price: 20 },
  { price: 7 },
  { price: 30 },
  { price: 28 },
  { price: 17 },
  { price: 23 },
  { price: 50 },
  { price: 10 },
];

// spread all arrayOfObject data in one object
const spreadData = async () => {
  return getGameData().then(async (resultGames) => {
    const resultUsers = await getUsersData();
    let mergeGamesAndUsers = resultGames.map((item, i) =>
      Object.assign({}, item, resultUsers[i])
    );
    let finalObject = mergeGamesAndUsers.map((item_1, i_1) =>
      Object.assign({}, item_1, arrayPrice[i_1])
    );
    return finalObject;
  });
};

// set values form main object in elements
spreadData().then((objectData) => {
  setValuesElement(objectData, createGameCard);
});

// create function for search engine
let searchInput = document.querySelector("#search");
const searchEngine = (value) => {
  let parentElement = document.querySelector("#sliders-wrapper");
  for (let i = 0; i < parentElement.children.length; i++) {
    let cardGame = parentElement.children[i];
    let cardGameTitle = cardGame.children[1].children[0].textContent
      .trim()
      .toLowerCase();
    if (cardGameTitle.includes(value.trim().toLowerCase())) {
      cardGame.style.display = "flex";
    } else {
      cardGame.style.display = "none";
    }
  }
};
searchInput.addEventListener("keyup", (e) => searchEngine(e.target.value));

// create function for category filter
let categoryBox = document.querySelector("#filter-categories #sort");
const categoryFilter = (value) => {
  let parentElement = document.querySelector("#sliders-wrapper");
  for (let i = 0; i < parentElement.children.length; i++) {
    let cardGame = parentElement.children[i];
    let cardGameTitle = cardGame.children[1].children[1].textContent
      .trim()
      .toLowerCase();
    if (cardGameTitle.includes(value.trim().toLowerCase())) {
      cardGame.style.display = "flex";
    } else if (value.trim().toLowerCase() === "all categories") {
      cardGame.style.display = "flex";
    } else {
      cardGame.style.display = "none";
    }
  }
};
categoryBox.addEventListener("change", (e) => categoryFilter(e.target.value));

// add to cart
const addToCard = () => {
  let productArray;
  if (localStorage.productArray) {
    productArray = JSON.parse(localStorage.productArray);
  }
  let addBtn = document.querySelectorAll(".add-cart");
  const getObject = (idValue) => {
    spreadData().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (String(data[i].id).includes(String(idValue))) {
          productArray.push(data[i]);
          return localStorage.setItem(
            "productArray",
            JSON.stringify(productArray)
          );
        }
      }
    });
  };
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.target.id));
  });
};

// add to fav
const addToFav = () => {
  let itemArray;
  if (localStorage.itemArray != null) {
    itemArray = JSON.parse(localStorage.itemArray);
  } else {
    itemArray = [];
  }
  let addBtn = document.querySelectorAll(".add-fav");
  const getObject = (idValue) => {
    spreadData().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (String(data[i].id).includes(String(idValue))) {
          itemArray.push(data[i]);
          return localStorage.setItem("itemArray", JSON.stringify(itemArray));
        }
      }
    });
  };
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.currentTarget.id));
  });
};
