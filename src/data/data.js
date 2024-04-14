import { Category, Product, Storage, AdvancedOptions, AdvancedOption } from '../common/classes';

const placeholderCoffee = [
    new Product(1, "Эспрессо", require('../static/products/coffee/espresso.webp'), 79, 109, 129),
    new Product(2, "Эспрессо 2х", require('../static/products/coffee/espresso2x.webp'), 82, 112, 132),
    new Product(3, "Американо", require('../static/products/coffee/amerikano.webp'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.webp'), 82, 112, 142),
    new Product(5, "Капучино", require('../static/products/coffee/capuchino.webp'), 87, 117, 147),
    new Product(6, "Макиато", require('../static/products/coffee/makiato.webp'), 80, 110, 140),
];

const placeholderTea = [
    new Product(1, "Чай с длинным названием", require('../static/products/coffee/espresso.webp'), 79, 109, 129),
    new Product(2, "Чай с еще более длинным названием", require('../static/products/coffee/espresso2x.webp'), 82, 112, 132),
    new Product(3, "Чай прям совсем длинный, ну очень очень длинный", require('../static/products/coffee/amerikano.webp'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.webp'), 82, 112, 142),
];

const placeholderCoctail = [
    new Product(1, "Эспрессо", require('../static/products/coffee/espresso.webp'), 79, 109, 129),
    new Product(2, "Эспрессо 2х", require('../static/products/coffee/espresso2x.webp'), 82, 112, 132),
    new Product(3, "Американо", require('../static/products/coffee/amerikano.webp'), 90, 120, 150),
    new Product(4, "Латте", require('../static/products/coffee/latte.webp'), 82, 112, 142),
    new Product(5, "Капучино", require('../static/products/coffee/capuchino.webp'), 87, 117, 147),
    new Product(6, "Макиато", require('../static/products/coffee/makiato.webp'), 80, 110, 140),
    new Product(7, "Эспрессо", require('../static/products/coffee/espresso.webp'), 79, 109, 129),
    new Product(8, "Эспрессо 2х", require('../static/products/coffee/espresso2x.webp'), 82, 112, 132),
    new Product(9, "Американо", require('../static/products/coffee/amerikano.webp'), 90, 120, 150),
    new Product(10, "Латте", require('../static/products/coffee/latte.webp'), 82, 112, 142),
    new Product(11, "Капучино", require('../static/products/coffee/capuchino.webp'), 87, 117, 147),
    new Product(12, "Макиато", require('../static/products/coffee/makiato.webp'), 80, 110, 140),
];

const placeholderJuice = [
    new Product(1, "Коктейль 1", require('../static/products/coffee/espresso.webp'), 79, 109, 129),
    new Product(2, "Коктейль 2", require('../static/products/coffee/espresso2x.webp'), 82, 112, 132),
    new Product(3, "Коктейль 3", require('../static/products/coffee/amerikano.webp'), 90, 120, 150),
];

export const storage = new Storage(
    [
        new Category(1, 'Кофе', require('../static/categories/coffee.webp'), placeholderCoffee),
        new Category(2, 'Чай', require('../static/categories/tea.webp'), placeholderTea),
        new Category(3, 'Молочный коктейль', require('../static/categories/coctail.webp'), placeholderCoctail),
        new Category(4, 'Морсы и газ.напитки', require('../static/categories/juice.webp'), placeholderJuice),
    ],
    new AdvancedOptions([
        new AdvancedOption(1, 'Ванильный сироп', 7),
        new AdvancedOption(2, 'Мятный сироп', 5),
        new AdvancedOption(3, 'Карамельный сироп', 9),
        new AdvancedOption(4, 'Шоколадный сироп', 10),
    ]),
)