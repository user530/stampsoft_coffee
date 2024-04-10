import { Category, Product, Storage, AdvancedOptions, AdvancedOption } from '../common/classes';

const placeholderCoffee = [
    new Product(1, "Эспрессо", require('../static/products/coffee/espresso.png'), 79, 109, 129),
    new Product(2, "Эспрессо 2х", require('../static/products/coffee/espresso2x.png'), 82, 112, 132),
    new Product(3, "Американо", require('../static/products/coffee/amerikano.png'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.png'), 82, 112, 142),
    new Product(5, "Капучино", require('../static/products/coffee/capuchino.png'), 87, 117, 147),
    new Product(6, "Макиато", require('../static/products/coffee/makiato.png'), 80, 110, 140),
];

const placeholderTea = [
    new Product(1, "Чай с длинным названием", require('../static/products/coffee/espresso.png'), 79, 109, 129),
    new Product(2, "Чай с еще более длинным названием", require('../static/products/coffee/espresso2x.png'), 82, 112, 132),
    new Product(3, "Чай прям совсем длинный, ну очень очень длинный", require('../static/products/coffee/amerikano.png'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.png'), 82, 112, 142),
];

const placeholderCoctail = [
    new Product(1, "Эспрессо", require('../static/products/coffee/espresso.png'), 79, 109, 129),
    new Product(2, "Эспрессо 2х", require('../static/products/coffee/espresso2x.png'), 82, 112, 132),
    new Product(3, "Американо", require('../static/products/coffee/amerikano.png'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.png'), 82, 112, 142),
    new Product(5, "Капучино", require('../static/products/coffee/capuchino.png'), 87, 117, 147),
    new Product(6, "Макиато", require('../static/products/coffee/makiato.png'), 80, 110, 140),
    new Product(7, "Эспрессо", require('../static/products/coffee/espresso.png'), 79, 109, 129),
    new Product(8, "Эспрессо 2х", require('../static/products/coffee/espresso2x.png'), 82, 112, 132),
    new Product(9, "Американо", require('../static/products/coffee/amerikano.png'), 90, 120, 150),
    new Product(10, "Латте", require('../static/products/coffee/latte.png'), 82, 112, 142),
    new Product(11, "Капучино", require('../static/products/coffee/capuchino.png'), 87, 117, 147),
    new Product(12, "Макиато", require('../static/products/coffee/makiato.png'), 80, 110, 140),
];

const placeholderJuice = [
    new Product(1, "Коктейль 1", require('../static/products/coffee/espresso.png'), 79, 109, 129),
    new Product(2, "Коктейль 2", require('../static/products/coffee/espresso2x.png'), 82, 112, 132),
    new Product(3, "Коктейль 3", require('../static/products/coffee/amerikano.png'), 90, 120, 150),
];

export const storage = new Storage(
    [
        new Category(1, 'Кофе', require('../static/categories/coffee.png'), placeholderCoffee),
        new Category(2, 'Чай', require('../static/categories/tea.png'), placeholderTea),
        new Category(3, 'Молочный коктейль', require('../static/categories/coctail.png'), placeholderCoctail),
        new Category(4, 'Морсы и газ.напитки', require('../static/categories/juice.png'), placeholderJuice),
    ],
    new AdvancedOptions([
        new AdvancedOption(1, 'Ванильный сироп', 7),
        new AdvancedOption(2, 'Мятный сироп', 5),
        new AdvancedOption(3, 'Карамельный сироп', 9),
        new AdvancedOption(4, 'Шоколадный сироп', 10),
    ]),
)

// export const productData = [
//     new Category(1, 'Кофе', require('../static/categories/coffee.png'), placeholderCoffee),
//     new Category(2, 'Чай', require('../static/categories/tea.png'), placeholderTea),
//     new Category(3, 'Молочный коктейль', require('../static/categories/coctail.png'), placeholderCoctail),
//     new Category(4, 'Морсы и газ.напитки', require('../static/categories/juice.png'), placeholderJuice),
// ]

// export const productData1 = [
//     {
//         id: "1",
//         name: "Кофе",
//         img: require("../static/categories/coffee.png"),
//         products: [
//             {
//                 id: "1a",
//                 name: "Эспрессо",
//                 img: require("../static/products/coffee/espresso.png"),
//                 starterPrice: 79,
//                 options: {}
//             },
//             {
//                 id: "1b",
//                 name: "Эспрессо 2х",
//                 img: require("../static/products/coffee/espresso2x.png"),
//                 starterPrice: 109
//             },
//             {
//                 id: "1c",
//                 name: "Американо",
//                 img: require("../static/products/coffee/amerikano.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "1d",
//                 name: "Латте",
//                 img: require("../static/products/coffee/latte.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "1e",
//                 name: "Капучино",
//                 img: require("../static/products/coffee/capuchino.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "1f",
//                 name: "Макиато",
//                 img: require("../static/products/coffee/makiato.png"),
//                 starterPrice: 129
//             }
//         ]
//     },
//     {
//         id: "2",
//         name: "Чай",
//         img: require("../static/categories/tea.png"),
//         products: [
//             {
//                 id: "2a",
//                 name: "Чай с еще более очень длинным названием топ кек чебурек",
//                 img: require("../static/products/coffee/espresso.png"),
//                 starterPrice: 79
//             },
//             {
//                 id: "2b",
//                 name: "Экспрессо 2х",
//                 img: require("../static/products/coffee/espresso2x.png"),
//                 starterPrice: 109
//             },
//             {
//                 id: "2c",
//                 name: "Американо",
//                 img: require("../static/products/coffee/amerikano.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "2d",
//                 name: "Латте",
//                 img: require("../static/products/coffee/latte.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "2e",
//                 name: "Капучино",
//                 img: require("../static/products/coffee/capuchino.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "2f",
//                 name: "Макиато",
//                 img: require("../static/products/coffee/makiato.png"),
//                 starterPrice: 129
//             }
//         ]
//     },
//     {
//         id: "3",
//         name: "Молочный коктейль",
//         img: require("../static/categories/coctail.png"),
//         products: [
//             {
//                 id: "3a",
//                 name: "Экспрессо",
//                 img: require("../static/products/coffee/espresso.png"),
//                 starterPrice: 79
//             },
//             {
//                 id: "3b",
//                 name: "Экспрессо 2х",
//                 img: require("../static/products/coffee/espresso2x.png"),
//                 starterPrice: 109
//             },
//             {
//                 id: "3c",
//                 name: "Американо",
//                 img: require("../static/products/coffee/amerikano.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3d",
//                 name: "Латте",
//                 img: require("../static/products/coffee/latte.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3e",
//                 name: "Капучино",
//                 img: require("../static/products/coffee/capuchino.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3f",
//                 name: "Макиато",
//                 img: require("../static/products/coffee/makiato.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3g",
//                 name: "Латте",
//                 img: require("../static/products/coffee/latte.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3h",
//                 name: "Капучино",
//                 img: require("../static/products/coffee/capuchino.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "3i",
//                 name: "Макиато",
//                 img: require("../static/products/coffee/makiato.png"),
//                 starterPrice: 129
//             }
//         ]
//     },
//     {
//         id: "4",
//         name: "Морсы и газ.напитки",
//         img: require("../static/categories/juice.png"),
//         products: [
//             {
//                 id: "4a",
//                 name: "Экспрессо",
//                 img: require("../static/products/coffee/espresso.png"),
//                 starterPrice: 79
//             },
//             {
//                 id: "4b",
//                 name: "Экспрессо 2х",
//                 img: require("../static/products/coffee/espresso2x.png"),
//                 starterPrice: 109
//             },
//             {
//                 id: "4c",
//                 name: "Американо",
//                 img: require("../static/products/coffee/amerikano.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "4d",
//                 name: "Латте",
//                 img: require("../static/products/coffee/latte.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "4e",
//                 name: "Капучино",
//                 img: require("../static/products/coffee/capuchino.png"),
//                 starterPrice: 129
//             },
//             {
//                 id: "4f",
//                 name: "Макиато",
//                 img: require("../static/products/coffee/makiato.png"),
//                 starterPrice: 129
//             }
//         ]
//     }
// ]