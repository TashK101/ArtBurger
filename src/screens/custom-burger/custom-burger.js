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
        count.textContent = `${currentValue - 1}`;
    }
}

window.addEventListener('load', function () {
    const listItems = document.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const repeatingHTML = '<div class="buttons"><button class="increment" onclick="increment(this)">+</button><span class="count">0</span>шт. <button class="increment" onclick="decrement(this)">-</button></div>';
        li.innerHTML = li.innerHTML + repeatingHTML;
    }

    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const img = document.querySelector('.image-overlay') ? document.querySelector('.image-overlay') : document.querySelector('.burger-img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(this.files[0]);
            img.classList.remove('image-overlay');
            img.classList.add('burger-img');
            const relevantSize = Math.min(img.height, img.width)

            img.style.clipPath = `circle(${relevantSize / 2}px at 50% 50%)`
        }
    });

    document.querySelector('#buy-button').addEventListener('click', function () {
        addItemToLocalCart()
    });
});

const CUSTOM_LABEL = "custom"

function addItemToLocalCart() {
    let cart = getLocalCartItems()
    const itemId = Math.floor(Math.random() * 100) + 1
    let count = 0;
    for (let key of cart.keys()) {
        if (key.includes(CUSTOM_LABEL)) count += 1
    }
    cart.set(`${CUSTOM_LABEL}-${itemId}`, new CartItem(`Кастомный бургер №${count + 1}`, 500))
    localStorage.setItem("cartItems", JSON.stringify(Object.fromEntries(cart)))
}

function getLocalCartItems() {
    let cartMap = new Map()
    const cart = localStorage.getItem("cartItems")
    if (cart === null || cart.length === 0) return cartMap
    return new Map(Object.entries(JSON.parse(cart)))
}

class CartItem {
    constructor(name, price) {
        this.name = name
        this.price = price
        this.quantity = 1
    }
}
