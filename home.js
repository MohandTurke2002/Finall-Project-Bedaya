// import get user function
import { getUsersData } from "./JS/functions.js";

// get parent post element
let parentPost = document.querySelector("#posts-container");

// create slider for events section
const eventsSlider = tns({
  container: ".events-slider",
  controlsContainer: ".sliders-container",
  prevButton: ".prev",
  nextButton: ".next",
  items: 1,
  slideBy: "page",
  mouseDrag: true,
  swipeAngle: false,
  autoplay: true,
  speed: 400,
  nav: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 3000,
  navContainer: ".dots",
});

// create posts function
const createPosts = (id, userImage, publisherName, para, imagePost) => {
  parentPost.innerHTML += `
    <div class="post-container" id=${id} >
      <div class="publisher-container">
        <div class="avatar-wrapper">
          <img src=${userImage} alt=${publisherName}>
        </div>
        <div class="user-info-wrapper">
          <h3>${publisherName}</h3>
          <p>25/6/2023</p>
        </div>
      </div>
      <div class="post-body-container">
        <div><p>${para}</p></div>
        <div><img src=${imagePost} alt="imagePost"></div>
      </div>
    </div>
  `;
};

// fetch posts from JSON Placeholder
const getPosts = async () => {
  let arrayPosts = [];
  const fetchPosts = await fetch("https://jsonplaceholder.typicode.com/posts");

  const postsData = await fetchPosts.json().then((res) => res.slice(0, 20));

  postsData.map(({ body, id }) => {
    arrayPosts.push({
      id,
      paraPost: body,
    });
  });

  return arrayPosts;
};

// fetch all games from RAWG API
const getGameData = async () => {
  let arrayGameResult = [];
  let gameData = await fetch(
    "https://api.rawg.io/api/games?key=9c70c85152224dac8f24a72f09805303&3498"
  );
  const jsonGameData = await gameData.json();

  const loopGamesResult = jsonGameData.results.map(({ short_screenshots }) =>
    arrayGameResult.push({
      screenShot: short_screenshots[2].image,
    })
  );

  return arrayGameResult;
};

// spread all arrayOfObject data in one object
const spreadData = async () => {
  return getGameData().then(async (resultGames) => {
    const resultUsers = await getUsersData();
    let mergeGamesAndUsers = resultGames.map((item, i) =>
      Object.assign({}, item, resultUsers[i])
    );
    const posts = getPosts().then((resultPosts) => {
      let finalObject = mergeGamesAndUsers.map((item_1, i_1) =>
        Object.assign({}, item_1, resultPosts[i_1])
      );
      // console.log(finalObject);
      return finalObject;
    });
    return posts;
  });
};

const setValuesInElement = () => {
  spreadData().then((data) => {
    data.map(({ id, paraPost, screenShot, userAvatar, userName }) => {
      createPosts(id, userAvatar, userName, paraPost, screenShot);
    });
  });
};

setValuesInElement();
