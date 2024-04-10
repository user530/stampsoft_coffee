export class Category {
    /**
     * Data about whole category of drinks
     * @param { Number } categoryId Category id 
     * @param { String } categoryName Category name
     * @param { String } categoryImg Category img
     * @param { Product[] } categoryProducts Category products
     */
    constructor(
        categoryId, 
        categoryName, 
        categoryImg, 
        categoryProducts, 
    ) {
        this.id = categoryId;
        this.name = categoryName;
        this.img = categoryImg;
        this.products = categoryProducts;
    }

    getProductById = (productId) => {
        return this.products.find(productObj => productObj.id === productId);
    }
}