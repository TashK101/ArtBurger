const sidenav = document.querySelector(".sidenav")
const sidenavOpen = document.querySelector("#openNav");
const sidenavClose = document.querySelector("#closeNav");
const reservation = document.querySelector(".reservation");
const reservationOpen = document.querySelector("#button_booking");
const reservationClose = document.querySelector(".reservation_closeNav");
const preloaderScene = document.querySelector('.preloader_scene');
const reservationLink = document.querySelector('#reservation_link');

sidenavOpen.addEventListener("click", () => sidenav.style.transform = "translateX(0)");
sidenavClose.addEventListener("click", () => sidenav.style.transform = "translateX(-100%)");

reservationOpen.addEventListener("click", () => reservation.style.transform = "translateX(0)");
reservationLink.addEventListener("click", () => reservation.style.transform = "translateX(0)");
reservationClose.addEventListener("click", () => reservation.style.transform = "translateX(100%)");

setTimeout(() => preloaderScene.style.display = 'none', 5000);