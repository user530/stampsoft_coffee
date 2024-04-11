import sprite from '../../static/sprite.svg';

const MetaSizeSmall = {
    optionId: 1,
    optionName: '200 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 119,
}

const MetaSizeMedium = {
    optionId: 2,
    optionName: '300 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 143,
}

const MetaSizeBig = {
    optionId: 3,
    optionName: '400 мл.',
    optionImg: `${sprite}#cup_symbol`,
    optionImgHeight: 174,
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
     */
    constructor(
        productId, 
        productName,
        productImg,
        productPriceSmall,
        productPriceMedium,
        productPriceBig,
        productQuantity = 100,
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
        }
    
    getOptionDataById = (sizeId) => {
        return this.sizes.find(optionPair => optionPair[0].optionId === sizeId);
    }
}