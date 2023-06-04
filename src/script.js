const sidenav = document.querySelector(".sidenav")
const sidenavOpen = document.querySelector("#openNav");
const sidenavClose = document.querySelector("#closeNav");
const reservation = document.querySelector(".reservation");
const reservationOpen = document.querySelector("#button_booking");
const reservationClose = document.querySelector(".reservation_closeNav");
const preloaderScene = document.querySelector('.preloader_scene');
const reservationLink = document.querySelector('#reservation_link');

sidenavOpen.addEventListener("click", () => sidenav.style.width = "513px");
sidenavClose.addEventListener("click", () => sidenav.style.width = "0px");

reservationOpen.addEventListener("click", () => reservation.style.width = "60%");
reservationLink.addEventListener("click", () => reservation.style.width = "60%");
reservationClose.addEventListener("click", () => reservation.style.width = "0");

/* function openMenuPage() {
    window.open("../menu/menu.html");
}

function openBookingPage() {
    window.open("../booking/booking.html");
} */

setTimeout(() => preloaderScene.style.display = 'none', 5000);