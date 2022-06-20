const userOptions = document.querySelector(".navbar-user-options");
const userLogoutButton = document.querySelector(".navbar-user-logout");

if (localStorage.getItem("token") !== null){
    userOptions.style.display = "none";
    userLogoutButton.style.display = "inline-block";
} else {
    userOptions.style.display = "inline";
    userLogoutButton.style.display = "none";
}

function logOut() {
    localStorage.clear();
    location.reload();
}