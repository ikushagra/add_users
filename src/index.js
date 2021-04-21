const api = `https://randomuser.me/api`;
const addUser = document.getElementById(`add-user-btn`);
const mainApp = document.getElementById("app");

async function foo() {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  console.log(userJson.results[0]);
  const user = userJson.results[0];
  const userEl = document.createElement("div");
  userEl.innerHTML = `<div>
${user.name.title} ${user.name.first} ${user.name.last}
</div>`;
  mainApp.appendChild(userEl);
}
addUser.addEventListener("click", foo);
