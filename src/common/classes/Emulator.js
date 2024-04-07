class Emulator {
    #status;
    #callbacks;
    #events;

    constructor() {
        this.#status = 'READY';
        this.#callbacks = {};
        this.#events = ['cashIn'];
    }

    get status() {
        return this.#status;
    }
    
    set status(newStatus) {
        this.#status = newStatus;
    }

    setStatusReady = () => {
        this.#status = 'READY';
    }

    setStatusCashIn = () => {
        this.#status = 'LISTENING_CASH';
    }

    isValidEvent = (eventName) => {
        return this.#events.includes(eventName);
    }

    /**
     * Register callback for a specified event
     * @param {String} eventName Name of the event to listen to
     * @param {Function} cb Callback to fire each time event fires
     */
    registerCallback = (eventName, cb) => {
        if(typeof eventName !== 'string' 
            || !this.isValidEvent(eventName))
                return console.error('Cant register callback for the invalid event!');
        
        this.#callbacks[eventName] = cb;
    }

    /**
     * Clear all events associated with the specified event
     * @param {String} eventName Name of the event to clear 
     */
    clearEventCallbacks = (eventName) => {
        if(typeof eventName !== 'string' 
            || !this.isValidEvent(eventName))
                return console.error('Cant register callback for the invalid event!');

        this.#callbacks[eventName] = null;
    }
    
    /**
     * Start listening to the 'cashIn' events and fire callback with a value of the inputed bill
     * @param {Function} cb Callback to fire each time event fires
     */
    StartCashin = (cb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.#status !== 'READY') 
            return;
        
        // Register callback
        this.registerCallback('cashIn', (cashinEvent) => cb(cashinEvent.amount))
        // Update the status
        this.setStatusCashIn();
    }

    /**
     * Emit 'cashIn' event with the provided amount
     * @param {number} cashAmount Money amount of the inputed bill
     */
    EmitCashin = (cashAmount) => {
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.#status !== 'LISTENING_CASH') 
            return;

        // Check argument 
        if(typeof cashAmount !== 'number' || isNaN(cashAmount)) 
            return console.error('Provide valid cash amount!');

        // Placeholder cashin event, later change to a creator method
        const cashinEvent = { name: 'cashIn', amount: cashAmount };

        // Fire a callback for the event
        this.#callbacks[cashinEvent.name](cashinEvent);
    }

    /**
     * Stops listening to the 'cashIn' events, clears callback and fires callback at the end
     * @param {Function} cb Callback to fire at the end of
     */
    StopCashin = (cb) => {
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.#status !== 'LISTENING_CASH') return;

        // Clear events and fire callback
        this.clearEventCallbacks('cashIn');
        this.setStatusReady();
        cb();
    }
}