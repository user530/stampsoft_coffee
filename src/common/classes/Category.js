export class Category {
    /**
     * Data about whole category of drinks
     * @param { number } categoryId Category id 
     * @param { string } categoryName Category name
     * @param { string } categoryImg Category img
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