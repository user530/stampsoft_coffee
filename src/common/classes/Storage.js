export class Storage {
    categories;
    advOptions;

    /**
     * Collection of all product categories in the vending machine 
     * @param {Category[]} categoryArray List of all categories
     * @param {AdvancedOptions} advOptions Object representing all advanced options
     */
    constructor(categoryArray, advOptions){
        this.categories = categoryArray;
        this.advOptions = advOptions;
    }

    generateCart = (categoryId, productId, sizeId, advancedOptionsSlice) => {
        if(!categoryId || !productId || !sizeId) return null;
        
        // Get product data from the storage
        const selectionCategory = this.categories.find(category => category.id === categoryId);

        if( !selectionCategory 
            || !selectionCategory.products 
            || !Array.isArray(selectionCategory.products)) return null;

        const selectionProduct = selectionCategory.getProductById(productId);

        if( !selectionProduct
            || !selectionProduct.sizes
            || !Array.isArray(selectionProduct.sizes)) return null;

        const selectionSize = selectionProduct.getOptionDataById(sizeId);

        if( !selectionSize
            || !Array.isArray(selectionSize)
            || !selectionSize[0]
            || !selectionSize[1]) return null;

        // If options slice is passed use it, if not - create an empty one
        const optionsSlice = advancedOptionsSlice ? advancedOptionsSlice : this.advOptions.getEmptyAdvOptions();

        // Calculate amount
        const productAmount = selectionSize[1];
        const optionsAmount = this.advOptions.calculateAdvOptions(optionsSlice)

        return {
            product: {
                categoryId,
                productId,
                sizeId,
            },
            advancedOptions: optionsSlice,
            totalAmount: (productAmount + optionsAmount)
        };
    }

    getCategoryById = (categoryId) => {
        return this.categories.find(category => category.id === categoryId);
    }

    getProductByCategoryId = (categoryId, productId) => {
        const category = this.getCategoryById(categoryId);
        return category ? category.getProductById(productId) : undefined;
    }
}