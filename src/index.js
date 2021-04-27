const api = `https://randomuser.me/api`;
const addUser = document.getElementById(`add-user-btn`);
const mainApp = document.getElementById("app");

const appState = [];
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const descSortBtn = document.getElementById("sort-desc");
const ascSortBtn = document.getElementById("sort-asc");

class User {
  constructor(title, first, last, gender, email) {
    this.name = `${first} ${last}`;
    this.title = `${title}`;
    this.gender = `${gender}`;
    this.email = `${email}`;
  }
}

async function foo() {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  // appState.push(user);
  const classUser = new User(user.name, user.title, user.gender, user.email);
  appState.push(classUser);

  domRenderer(appState);
}

const domRenderer = (stateArray) => {
  userList.innerHTML = null;

  stateArray.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
  Name: ${userObj.name}
  <ol>
  <li>${userObj.gender}</li>
  <li>${userObj.email}</li>
  </ol>
  </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", () => {
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});

descSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appStateCopy);
});

ascSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRenderer(appStateCopy);
});

addUser.addEventListener("click", foo);
