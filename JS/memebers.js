import { isExists, setValuesInElements } from "./functions.js";

// create Elements
const createMemberCard = (id, avatar, userName, userId) => {
  let membersContainer = document.querySelector("#member-container");
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
    </div>
  </div>
  `;
  addFavCart(id);
  addToFriend();
};

const addFavCart = (id) => {
  let parentElement = document.querySelectorAll(".add-friend-wrapper");
  if (isExists) {
    parentElement.forEach((Element) => {
      Element.innerHTML = `
      <button class="add-friend" id=${id}>Add Friend <i class="bx bx-user-plus"></i></button>
    `;
    });
  } else {
    parentElement.forEach((Element) => {
      Element.innerHTML = "";
    });
  }
};

const getUsersData = async () => {
  let arrayUserResult = [];

  let userData = await fetch("https://reqres.in/api/users");
  const jsonUserData = await userData.json();

  let userData_2 = await fetch("https://reqres.in/api/users?page=2");
  const jsonUserData_2 = await userData_2.json();

  const loopUsersResult = jsonUserData.data.map(
    ({ avatar, first_name, last_name, id }) => {
      return arrayUserResult.push({
        userAvatar: avatar,
        userName: `${first_name} ${last_name}`,
        userId: `@${first_name}`,
        id,
      });
    }
  );

  const loopUserResult_2 = jsonUserData_2.data.map(
    ({ avatar, first_name, last_name, id }) => {
      return arrayUserResult.push({
        userAvatar: avatar,
        userName: `${first_name} ${last_name}`,
        userId: `@${first_name}`,
        id,
      });
    }
  );

  return arrayUserResult.slice(0, 20);
};

// set values form main object in elements
getUsersData().then((objectData) => {
  setValuesInElements(objectData, createMemberCard);
});

// add friend
const addToFriend = () => {
  let friendArray;
  if (localStorage.friendArray != null) {
    friendArray = JSON.parse(localStorage.friendArray);
  } else {
    friendArray = [];
  }
  let addBtn = document.querySelectorAll(".add-friend");
  const getObject = (idValue) => {
    getUsersData().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (String(data[i].id).includes(String(idValue))) {
          friendArray.push(data[i]);
          return localStorage.setItem(
            "friendArray",
            JSON.stringify(friendArray)
          );
        }
      }
    });
  };
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => getObject(e.currentTarget.id));
  });
};
