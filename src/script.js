const sidenav = document.querySelector(".sidenav")
const sidenavOpen = document.querySelector("#openNav");
const sidenavClose = document.querySelector("#closeNav");

sidenavOpen.addEventListener("click", () => sidenav.style.width = "513px")
sidenavClose.addEventListener("click", () => sidenav.style.width = "0px")

function openMenuPage() {
    window.open("../menu/menu.html");
}

function openBookingPage() {
    window.open("../booking/booking.html");
}
