const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
const sectionBurger = document.getElementById("menu_section_burger");
const sectionSnacks = document.getElementById("menu_section_snacks");
const sectionSalad = document.getElementById("menu_section_salad");
const sectionDeserts = document.getElementById("menu_section_deserts");
const sectionDrinksNonAlcoholic = document.getElementById("menu_section_drinks_non_alcoholic");
const sectionDrinksAlcoholic = document.getElementById("menu_section_drinks_alcoholic");

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

class MenuItem {
    constructor(id, sectionId, name, description, image, price) {
        this.id = id;
        this.sectionId = sectionId
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }
}

const menuItems = [
    new MenuItem("1", 1, "Чистый холст", "Любая начинка и любое изображение на Ваш выбор.", "../../images/menu/menu_burger_1.png", 500),
    new MenuItem("2", 1, "Чизбургер с яичницей «Постоянство памяти»", "Котлета из курицы, сыр чеддер, сыр моцарелла, яичница, сыр пармезан,  соус томатный, соус сырный", "../../images/menu/menu_burger_2.png", 350),
    new MenuItem("3", 1, "Чизбургер «Подсолнухи»", "Котлета из мраморной говядины, сыр чеддер, сыр моцарелла, сыр пармезан, маринованный огурец, соус томатный, соус сырный", "../../images/menu/menu_burger_3.png", 300),
    new MenuItem("4", 1, "Бургер с креветками «Девятый вал»", "Креветки тигровые, курица,  салат Айсберг, соус устричный", "../../images/menu/menu_burger_4.png", 450),
    new MenuItem("5", 2, "Едоки картофеля", "Дольки картофеля, жаренные во фритюре.", "../../images/menu/menu_snacks_1.png", 200),
    new MenuItem("6", 2, "Круги в круге", "Луковые кольца в кляре.", "../../images/menu/menu_snacks_2.png", 180),
    new MenuItem("7", 2, "Динамический супрематизм № 38", "Гренки ржаные с чесноком, гренки пшеничные острые.", "../../images/menu/menu_snacks_3.png", 150),
    new MenuItem("8", 3, "Триумф Цезаря", "Листья салата романо, сухарики из багета, чеснок, сыр пармезан, томаты черри, яйца перепелиные, оливковое масло.", "../../images/menu/menu_salad_1.png", 500),
    new MenuItem("9", 3, "Союз Земли и Воды", "Помидоры, огурцы свежие, лук красный, сыр фета, оливки, перец болгарский, оливковое масло.", "../../images/menu/menu_salad_2.png", 350),
    new MenuItem("10", 3, "Итальянский полдень", "Томаты свежие, базилик, сыр моцарелла, бальзамический крем-соус.", "../../images/menu/menu_salad_3.png", 300),
    new MenuItem("11", 4, "Звёздная ночь", "Тесто песочное, сахар, черника, сливочный мусс, белый шоколад.", "../../images/menu/menu_deserts_1.png", 550),
    new MenuItem("12", 4, "Девочка с персиками", "Персиковый сорбет - 100 г.", "../../images/menu/menu_deserts_2.png", 300),
    new MenuItem("13", 4, "Голубые танцовщицы", "Десерт «Павлова» с голубикой.", "../../images/menu/menu_deserts_3.png", 300),
    new MenuItem("14", 4, "Шоколадница", "Шоколадный фондан классический.", "../../images/menu/menu_deserts_4.png", 400),
    new MenuItem("15", 5, "Утро в сосновом лесу", "Морс брусничный.", "../../images/menu/menu_drinks_1.png", 100),
    new MenuItem("16", 5, "Родник в лесу", "Вода негазированная 0,5 л.", "../../images/menu/menu_drinks_2.png", 90),
    new MenuItem("17", 5, "Большая волна в Канагаве", "Чай в чашке Ассам «Голд»", "../../images/menu/menu_drinks_3.png", 110),
    new MenuItem("18", 6, "Рождение Венеры", "Пиво чешское Светлое нефильтрованное/Тёмное", "../../images/menu/menu_drinks_4.png", 150)
];

menuItems.filter((item) => item.sectionId === 1).forEach((item, index) => {
    showMenuItem(item, index, sectionBurger)
});
menuItems.filter((item) => item.sectionId === 2).forEach((item, index) => {
    showMenuItem(item, index, sectionSnacks)
});
menuItems.filter((item) => item.sectionId === 3).forEach((item, index) => {
    showMenuItem(item, index, sectionSalad)
});
menuItems.filter((item) => item.sectionId === 4).forEach((item, index) => {
    showMenuItem(item, index, sectionDeserts)
});
menuItems.filter((item) => item.sectionId === 5).forEach((item, index) => {
    showMenuItem(item, index, sectionDrinksNonAlcoholic)
});
menuItems.filter((item) => item.sectionId === 6).forEach((item, index) => {
    showMenuItem(item, index, sectionDrinksAlcoholic)
});

function showMenuItem(item, index, list) {
    const menuItem = document.createElement("li");
    if (index % 2 === 0) {
        menuItem.innerHTML = `
    <div id="menu_container" data-id="${item.id}">
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
                 <p class="menu_header">${item.price} р.</p>
                 <button class="add_to_cart_btn">заказать</button>
             </div>
         </div>
  `;
    } else {
        menuItem.innerHTML = `
    <div id="menu_container" data-id="${item.id}">
         <div id="menu_container_with_content_with_margin">
             <div>
                <p class="menu_header">${item.name}</p>
                 <div class="menu_desc">
                     <p>${item.description}</p>
                 </div>
                 <p class="menu_header">${item.price} р.</p>
                 <button class="add_to_cart_btn">заказать</button>
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
    list.appendChild(menuItem);
}

export function getMenuItemById(id) {
    return menuItems.find(item => item.id === id);
}
