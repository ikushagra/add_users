const api = `https://randomuser.me/api`;
const addUser = document.getElementById(`add-user-btn`);
const mainApp = document.getElementById("app");

const appState = [];
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

async function foo() {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  appState.push(user);
  console.log(appState);
  domRenderer(appState);
}

const domRenderer = (stateArray) => {
  userList.innerHTML = null;

  stateArray.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
  ${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
  </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", () => {
  const filteredAppState = appState.filter((user) =>
    user.name.first.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});

addUser.addEventListener("click", foo);
