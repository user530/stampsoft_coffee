export class Storage {
    #storage;
    #advOptions;

    /**
     * Collection of all product categories in the vending machine 
     * @param {Category[]} categoryArray List of all categories
     * @param {AdvancedOptions} advOptions Object representing all advanced options
     */
    constructor(categoryArray, advOptions){
        this.#storage = categoryArray;
        this.#advOptions = advOptions;
    }

    get categories() {
        return this.#storage;
    }

    get advOptions() {
        return this.#advOptions;
    }

    /**
     * Try to find the price of the product with specified identifiers
     * @param {number} categoryId Category identifier
     * @param {number} productId Product identifier
     * @param {number} optionId Option identifier
     * @returns Price value for the specified product
     */
    priceBySelection = (categoryId, productId, optionId) => {
        const selectedCategory = this.#storage.find(category => category.id === categoryId);

        if(!selectedCategory || !selectedCategory.products)
            return NaN;
        
        const selectedProduct = selectedCategory.products.find(product => product.id === productId);

        if(!selectedProduct || !selectedProduct.sizes)
            return NaN;

        const selectedOption = selectedProduct.sizes.find(([optionMetadata]) => optionMetadata.optionId === optionId);

        if(!selectedOption || !selectedOption[1])
            return NaN;

        return (!selectedOption || !selectedOption[1] ) ? NaN : selectedOption[1];
    }

    generateCart(categoryId, productId, sizeId, advancedOptionsSlice) {
        if(!categoryId || !productId || !sizeId) return null;
        
        // Get product data from the storage
        const selectionCategory = this.#storage.find(category => category.id === categoryId);

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
        const optionsSlice = advancedOptionsSlice ? advancedOptionsSlice : this.#advOptions.getEmptyAdvOptions();

        // Calculate amount
        const productAmount = selectionSize[1];
        const optionsAmount = this.#advOptions.calculateAdvOptions(optionsSlice)

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
}