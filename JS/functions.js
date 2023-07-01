// fetch users info from Reqres API
export const getUsersData = async () => {
  let arrayUserResult = [];
  for (let i = 0; i <= 1; i++) {
    let userData = await fetch("https://reqres.in/api/users");
    const jsonUserData = await userData.json();

    let userData_2 = await fetch("https://reqres.in/api/users?page=2");
    const jsonUserData_2 = await userData_2.json();

    const loopUsersResult = jsonUserData.data.map(
      ({ avatar, first_name, last_name }) => {
        return arrayUserResult.push({
          userAvatar: avatar,
          userName: `${first_name}${last_name}`,
        });
      }
    );

    const loopUserResult_2 = jsonUserData_2.data.map(
      ({ avatar, first_name, last_name }) => {
        return arrayUserResult.push({
          userAvatar: avatar,
          userName: `${first_name}${last_name}`,
        });
      }
    );
  }

  return arrayUserResult.slice(0, 20);
};

// add hover animation on the add to fav element
export const animateAddFavIcon = () => {
  let addToFavArray = document.querySelectorAll("#addToFav");
  addToFavArray.forEach((addToFav) => {
    addToFav.addEventListener("mouseenter", () => {
      addToFav.classList.replace("bx-heart", "bxs-heart");
    });
  });
  addToFavArray.forEach((addToFav) => {
    addToFav.addEventListener("mouseleave", () => {
      addToFav.classList.replace("bxs-heart", "bx-heart");
    });
  });
};

// create video auto play animation
export const animateVideoGame = () => {
  let cardGameArray = document.querySelectorAll(".card-game");
  const videoGamePlay = (id) => {
    let videoGame = document.getElementById(`video-${id}`);
    videoGame.classList.add("auto-play");
    videoGame.play();
  };

  const videoGameStop = (id) => {
    let videoGame = document.getElementById(`video-${id}`);
    videoGame.classList.remove("auto-play");
    videoGame.pause();
  };
  cardGameArray.forEach((cardGame) => {
    cardGame.addEventListener("mouseenter", () => videoGamePlay(cardGame.id));
    cardGame.addEventListener("mouseleave", () => videoGameStop(cardGame.id));
  });
};

// set values games form main object in elements
export const setValuesElement = (array, create) => {
  array.map(
    ({
      id,
      gameImage,
      gameName,
      gamePlatform,
      gameRate,
      gameType,
      price,
      userAvatar,
      userName,
    }) => {
      create(
        id,
        gameImage,
        gameName,
        gameType,
        gameRate,
        price,
        userAvatar,
        userName,
        gamePlatform
      );
    }
  );
};

// set values friends form main object in elements
export const setValuesInElements = (array, create) => {
  array.map(({ id, userAvatar, userName, userId }) => {
    create(id, userAvatar, userName, userId);
  });
};

// create a boolean for user is exists
export let isExists;
if (localStorage.user) {
  isExists = true;
} else {
  isExists = false;
}
