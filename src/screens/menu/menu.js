class MenuItem {
    constructor(name, description, image, price) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }
}

const menuItems = [new MenuItem("Чистый холст", "Любая начинка и любое изображение на Ваш выбор.", "../../images/menu_burger_1.png", "500 р."), new MenuItem("Чизбургер с яичницей «Постоянство памяти»", "Котлета из курицы, сыр чеддер, сыр моцарелла, яичница, сыр пармезан,  соус томатный, соус сырный", "../../images/menu_burger_2.png", "320 р."), new MenuItem("Чизбургер «Подсолнухи»", "Котлета из мраморной говядины, сыр чеддер, сыр моцарелла, сыр пармезан, маринованный огурец, соус томатный, соус сырный", "../../images/menu_burger_3.png", "300 р."), new MenuItem("Бургер с креветками «Девятый вал»", "Креветки тигровые, курица,  салат Айсберг, соус устричный", "../../images/menu_burger_4.png", "410 р.")];

const menuList = document.getElementById("menu_list");
menuItems.forEach((item, index) => {
    const menuItem = document.createElement("li");
    if (index % 2 === 0) {
        menuItem.innerHTML = `
    <div id="menu_container">
         <div id="menu_container_with_image_with_margin">
             <div id="menu_image_border">
                 <img id="menu_image" src="${item.image}" alt="${item.name}">
             </div>
         </div>
         <div id="menu_container_with_content">
             <div>
                 <p class="menu_header">${item.name}</p>
                 <div class="menu_desc">
                     <p>${item.description}</p>
                 </div>
                 <p class="menu_header">${item.price}</p>
                 <button class="main_button">заказать</button>
             </div>
         </div>
  `;
    } else {
        menuItem.innerHTML = `
    <div id="menu_container">
         <div id="menu_container_with_content_with_margin">
             <div>
                <p class="menu_header">${item.name}</p>
                 <div class="menu_desc">
                     <p>${item.description}</p>
                 </div>
                 <p class="menu_header">${item.price}</p>
                 <button class="main_button">заказать</button>
             </div>
             </div>
             <div id="menu_container_with_image">
             <div id="menu_image_border">
                 <img id="menu_image" src="${item.image}" alt="${item.name}">
             </div>
         </div>
         </div>
  `;
    }
    menuList.appendChild(menuItem);
});
document.body.appendChild(menuList);
