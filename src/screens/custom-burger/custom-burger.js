
function increment(btn) {
    const li = btn.parentNode;
    const count = li.querySelector('.count');
    count.textContent = parseInt(count.textContent) + 1;
}

function decrement(btn) {
    const li = btn.parentNode;
    const count = li.querySelector('.count');
    const currentValue = parseInt(count.textContent);
    if (currentValue > 0) {
        count.textContent = currentValue - 1;
    }
}
window.addEventListener('load', function() {
    const sidenav = document.querySelector(".sidenav")
    const sidenavOpen = document.querySelector("#openNav");
    const sidenavClose = document.querySelector("#closeNav");

    sidenavOpen.addEventListener("click", () => sidenav.style.width = "513px")
    sidenavClose.addEventListener("click", () => sidenav.style.width = "0px")

    const listItems = document.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const repeatingHTML = '<div class="buttons"><button class="increment" onclick="increment(this)">+</button><span class="count">0</span>шт. <button class="increment" onclick="decrement(this)">-</button></div>';
        li.innerHTML = li.innerHTML + repeatingHTML;
    }

    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const img = document.querySelector('.image-overlay');
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }

            img.src = URL.createObjectURL(this.files[0]);
            img.classList.remove('image-overlay');


            img.classList.add('burger-img');
            const relevantSize = Math.min(img.height, img.width)

            img.style.clipPath = `circle(${relevantSize/2}px at 50% 50%)`
        }
    });

});