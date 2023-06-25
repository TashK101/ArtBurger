
function increment(btn) {
    var li = btn.parentNode;
    var count = li.querySelector('.count');
    count.textContent = parseInt(count.textContent) + 1;
}

function decrement(btn) {
    var li = btn.parentNode;
    var count = li.querySelector('.count');
    var currentValue = parseInt(count.textContent);
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
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const img = document.querySelector('.image-overlay');
            const canvas = document.querySelector('.my-canvas');
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }

            img.src = URL.createObjectURL(this.files[0]);
            img.classList.remove('image-overlay');
            canvas.classList.remove('my-canvas');

            img.classList.add('burger-img');
            canvas.classList.add('burger-img');
            const relevantSize = Math.min(img.height, img.width)

            img.style.clipPath = `circle(${relevantSize/2}px at 50% 50%)`
        }
    });

});