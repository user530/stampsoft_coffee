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
     * @param {Number} categoryId Category identifier
     * @param {Number} productId Product identifier
     * @param {Number} optionId Option identifier
     * @returns Price value for the specified product
     */
    priceBySelectionId = (categoryId, productId, optionId) => {
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
}