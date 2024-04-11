export class AdvancedOption {
    /**
     * Singular advanced option item
     * @param {number} id Advanced option identifier
     * @param {string} name Advanced option name
     * @param {number} pricePerUnit Price per unit of the option
     * @param {number} quantity Number of advanced option units
     * @param {number} [step=5] Advanced option step 
     */
    constructor(
        id,
        name,
        pricePerUnit,
        quantity = 100,
        step = 5
    ){
        this.id = id;
        this.name = name;
        this.price = pricePerUnit;
        this.quantity = quantity;
        this.step = step;
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
     * @param {number} optionId Option identifier
     * @param {number} optionQuantity Option quantity
     * @returns Total
     */
    calculateSingleOption = (optionId, optionQuantity) => {
        const option = this.#optionsList.find(advOption => advOption.id === optionId);
        
        if(!option) return 0;

        return option.price * optionQuantity;
    }

    /**
     * Calculate the total amount of the advanced options
     * @param {{[optionId: number]: number}} advOptionsSlice Array of partial advanced options
     * @returns Total amount for the provided options slice
     */
    calculateAdvOptions = (advOptionsSlice) => {
        if(!advOptionsSlice) return 0;
        
        return Object
        .entries(advOptionsSlice)
        .reduce(
            (total ,[optionId, amount]) => {
                // We parse optionId because object keys are transformed into strings
                total += this.calculateSingleOption(parseInt(optionId), amount);
                return total;
            }, 
            0
        );
    }

    getEmptyAdvOptions = () => {
        return this.#optionsList.reduce(
            (optionsObj, {id}) => {
                optionsObj[id] = 0;
                return optionsObj;
            },
            {} 
        );
    }
}