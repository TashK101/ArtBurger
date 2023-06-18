import {getMenuItemById} from "../menu/menu.js";

class CartItem {
    constructor(name, price) {
        this.name = name
        this.price = price
        this.quantity = 1
    }
}

class LocalCart {
    static key = "cartItems"

    static getLocalCartItems() {
        let cartMap = new Map()
        const cart = localStorage.getItem(LocalCart.key)
        if (cart === null || cart.length === 0) return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        } else cart.set(id, item)
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateUI()
    }

    static removeItemFromCart(id) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            if (mapItem.quantity > 1) {
                mapItem.quantity -= 1
                cart.set(id, mapItem)
            } else cart.delete(id)
        }
        if (cart.length === 0) {
            localStorage.clear()
        } else {
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        }
        updateUI()
    }

    static clearItemFromCart(id) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            cart.delete(id)
        }
        if (cart.length === 0) {
            localStorage.clear()
        } else {
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        }
        updateUI()
    }
}

const addToCartButtons = document.querySelectorAll('.add_to_cart_btn')
addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', addItemFunction)
})

function addItemFunction(e) {
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    const menuItem = getMenuItemById(id)
    const cartItem = new CartItem(menuItem.name, menuItem.price)
    LocalCart.addItemToLocalCart(id, cartItem)
    console.log(LocalCart.getLocalCartItems())
}

function updateUI() {
    const cartWrapper = document.getElementById('cart_content_wrapper')
    cartWrapper.innerHTML = ""
    const mainDiv = document.createElement("div")
    const items = LocalCart.getLocalCartItems()
    if (items === null) return
    let count = 0
    let total = 0
    const cartList = document.createElement("ul");
    cartList.setAttribute("id", "cart_list")
    for (const [key, value] of items.entries()) {
        const listItem = document.createElement("li");

        const div = document.createElement("div")
        div.setAttribute("class", "cart_element")
        div.setAttribute("data-id", `${value.id}`)

        const decrement = document.createElement("img")
        decrement.setAttribute("src", "../../images/cart_decrement_item.svg")
        decrement.setAttribute("width", "30")
        decrement.setAttribute("height", "30")
        decrement.addEventListener("click", function () {
            LocalCart.removeItemFromCart(key)
        });
        div.append(decrement)

        const name = document.createElement("p")
        name.setAttribute("class", "cart_text")
        name.style.width = "200px"
        name.textContent = value.name
        div.append(name)

        const quantity = document.createElement("p")
        quantity.setAttribute("class", "cart_text")
        quantity.textContent = `${value.quantity} шт.`
        div.append(quantity)

        const increment = document.createElement("img")
        increment.setAttribute("src", "../../images/cart_increment_item.svg")
        increment.setAttribute("width", "30")
        increment.setAttribute("height", "30")
        increment.addEventListener("click", function () {
            LocalCart.addItemToLocalCart(key, value)
        });
        div.append(increment)

        const price = document.createElement("p")
        price.setAttribute("class", "cart_text")
        price.textContent = `${value.price} рублей`
        div.append(price)

        const clear = document.createElement("img")
        clear.setAttribute("src", "../../images/cart_clear_item.svg")
        clear.setAttribute("width", "40")
        clear.setAttribute("height", "52")
        clear.addEventListener("click", function () {
            LocalCart.clearItemFromCart(key)
        });
        div.append(clear)

        listItem.append(div);
        cartList.append(listItem)
        count += 1
        total += value.price * value.quantity
    }
    if (count === 0) {
        const label = document.createElement("p")
        label.setAttribute("id", "cart_no_items")
        label.textContent = "Кажется, корзина пуста..."
        mainDiv.append(label)
    } else {
        const header = document.createElement("p")
        header.setAttribute("id", "cart_header")
        header.textContent = "КОРЗИНА"
        mainDiv.append(header)

        mainDiv.append(cartList)

        const summary = document.createElement("p")
        summary.setAttribute("id", "cart_summary")
        summary.textContent = `Итого: ${total} рублей`
        mainDiv.append(summary)

        const checkOutButton = document.createElement("button")
        checkOutButton.setAttribute("class", "main_button_black")
        checkOutButton.textContent = "Оформить";
        checkOutButton.addEventListener("click", function () {
            window.location.href = "../order/order.html"
        });

        mainDiv.append(checkOutButton)
    }
    cartWrapper.append(mainDiv)
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI()
})
