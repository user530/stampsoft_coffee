export class Order {
    /**
     * Information about single user order
     * @param {number} categoryId Order category identifier
     * @param {number} productId Order product identifier
     * @param {number} sizeId Order size identifier
     * @param {{[advOptionId: number]: number}} advOptions Order advanced options slice as a map of adv optin identifiers and amounts of the said option
     * @param {number} totalAmount Total order amount
     * @param {'CARD' | 'CASH'} purchaseMethod Purchase method
     */
    constructor(categoryId, productId, sizeId, advOptions, totalAmount, purchaseMethod){
        this.categoryId = categoryId;
        this.productId = productId;
        this.sizeId = sizeId;
        this.advOptions = advOptions;
        this.totalAmount = totalAmount;
        this.purchaseMethod = purchaseMethod;
        this.date = new Date();
    }
}