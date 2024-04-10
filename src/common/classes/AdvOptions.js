export class AdvancedOption {
    /**
     * Singular advanced option item
     * @param {Number} id Advanced option identifier
     * @param {String} name Advanced option name
     * @param {Number} pricePerUnit Price per unit of the option
     * @param {Number} quantity Number of advanced option units
     */
    constructor(
        id,
        name,
        pricePerUnit,
        quantity,
    ){
        this.id = id;
        this.name = name;
        this.price = pricePerUnit;
        this.quantity = quantity; 
    }
}

export class AdvancedOptions {
    #optionsList;
    
    /**
     * Advanced options collection
     * @param {AdvancedOption[]} advOptionsList The list of all advanced options
     */
    constructor(
        advOptionsList
    ){
        this.#optionsList = advOptionsList;
    }

    get list() {
        return this.#optionsList;
    }

    /**
     * Total amount for the specified option and quantity
     * @param {Number} optionId Option identifier
     * @param {Number} optionQuantity Option quantity
     * @returns Total
     */
    calculateSingleOption = (optionId, optionQuantity) => {
        const option = this.#optionsList.find(advOption => advOption.id === optionId);

        if(!option) return 0;

        return option.price * optionQuantity;
    }

    /**
     * Calculate the total amount of the advanced options
     * @param {{optionId: Number, optionQuantity: Number}[]} advOptionsSlice Array of partial advanced options
     * @returns Total amount for the provided options slice
     */
    calculateAdvOptions = (advOptionsSlice) => {
        const totalAmount = advOptionsSlice.reduce(
            (total, {optionId, optionQuantity}) => total += this.calculateSingleOption(optionId, optionQuantity),
            0
        );

        return totalAmount;
    }
}