import sprite from '../../static/sprite.svg';

const MetaSizeSmall = {
    optionId: 1,
    optionName: '200 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 119,
    optionModifier: 1,
}

const MetaSizeMedium = {
    optionId: 2,
    optionName: '300 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 143,
    optionModifier: 1.5,
}

const MetaSizeBig = {
    optionId: 3,
    optionName: '400 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 174,
    optionModifier: 2,
};

export class Product {
    /**
     * Data about single drink
     * @param { number } productId Drink identifier
     * @param { string } productName Drink name
     * @param { string } productImg Drink image
     * @param { number } productPriceSmall Price of the small serving
     * @param { number } productPriceMedium Price of the medium serving
     * @param { number } productPriceBig Price of the big serving
     * @param { [stepText: string, stepSeconds: number][] } productSteps The array of vending stages that are represented during brewing stage
     */
    constructor(
        productId, 
        productName,
        productImg,
        productPriceSmall,
        productPriceMedium,
        productPriceBig,
        productSteps = [
            ['Мелем кофе', 5], 
            ['Добавляем приготовленный кофе', 5], 
            ['Кипятим воду', 5], 
            ['Добавляем кипяток', 5], 
            ['Завариваем кофе', 5], 
            ['Подготовка в выдаче', 5]
        ],
        productQuantity = parseInt(Math.random() * 10),
        ){
            this.id = productId;
            this.name = productName;
            this.img = productImg;
            this.sizes = [
                [MetaSizeSmall, productPriceSmall],
                [MetaSizeMedium, productPriceMedium],
                [MetaSizeBig, productPriceBig],
            ];
            this.quantity = productQuantity;
            this.steps = productSteps;
        }
    
    getOptionDataById = (sizeId) => {
        return this.sizes.find(optionPair => optionPair[0].optionId === sizeId);
    }

    /**
     * Reduce product quantity by the quantity of the specified size option
     * @param {number} sizeId Size option identifier to use as a quantity base
     */ 
    deductSingleOptionSize = (sizeId) => {
        const option = this.getOptionDataById(sizeId);
        if(!option) return;
        this.quantity = Math.max(0, this.quantity - option[0].optionModifier);
    }
}