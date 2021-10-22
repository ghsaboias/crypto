const serverUrl = "https://tijxuy0a2wlf.usemoralis.com:2053/server";
const appId = "3AfMe40VRoHsCpN0OJd4wxdgJB0VhpzeVta9TXHU";
Moralis.start({ serverUrl, appId });

async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log("Logged in user:", user);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("Logged out");
}

document.getElementById("btn-login").onclick = login();
document.getElementById("btn-logout").onclick = logOut();