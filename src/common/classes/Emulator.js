export class Emulator {
    #status = 'READY';
    #callbacks = {};
    #events = ['cashIn', 'confirmPayment', 'cancelPayment'];
    #stash = 0;

    get status() {
        return this.#status;
    }
    
    set status(newStatus) {
        this.#status = newStatus;
    }

    get stash() {
        return this.#stash;
    }

    set stash(newAmount) {
        this.#stash = newAmount;
    }

    incrementStash = (addToStash) => {
        this.#stash += addToStash;
    }

    clearStash = () => {
        this.#stash = 0;
    }

    setStatusReady = () => {
        this.#status = 'READY';
    }

    setStatusWaitingCash = () => {
        this.#status = 'WAITING_CASH';
    }

    setStatusWaitingConfirm = () => {
        this.#status = 'WAITING_CONFIRM';
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
        this.setStatusWaitingCash();
    }

    /**
     * Emit 'cashIn' event with the provided amount
     * @param {number} cashAmount Money amount of the inputed bill
     */
    EmitCashin = (cashAmount) => {
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.#status !== 'WAITING_CASH')
            return;

        // Check argument 
        if(typeof cashAmount !== 'number' || isNaN(cashAmount)) 
            return console.error('Provide valid cash amount!');

        // Placeholder cashin event, later change to a creator method
        const cashinEvent = { name: 'cashIn', amount: cashAmount };

        // Add to stash
        this.incrementStash(cashAmount);

        // Fire a callback for the event
        this.#callbacks[cashinEvent.name](cashinEvent);
    }

    /**
     * Stops listening to the 'cashIn' events, clears callback and fires callback at the end
     * @param {Function} cb Callback to fire at the end of
     */
    StopCashin = (cb) => {
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.#status !== 'WAITING_CASH') return;

        // Clear events and fire callback
        this.clearEventCallbacks('cashIn');
        this.setStatusWaitingConfirm();
        cb();
    }

    CashPurchase = (cashInCb, confirmCb, cancelCb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.#status !== 'READY') 
            return;
        
        this.registerCallback('confirmPayment', (result) => confirmCb(result));
        this.registerCallback('cancelPayment', (reason) => cancelCb(reason));

        this.StartCashin(cashInCb);
    }

    EmitConfirm = (confirmData) => {
        console.log('Emit confirm fired');

        // Skip, if emulator currently not listening to the 'confirm' events
        if(this.#status !== 'WAITING_CONFIRM')
            return;

        const { type, change } = confirmData;

        console.log(confirmData);
        // If confirming cash payment -> return change
        if( type === 'cash' && change){
            console.log('Cash payment');

            // Return the user change (if any) and clear the stash
            if(change) this.returnChange(change);
            this.clearStash();

            // Return to idle status
            this.setStatusReady();

            console.log(this.#status);

            // Fire a callback for the event, there is no 'failed' confirm so pass true
            this.#callbacks['confirmPayment'](true);
            
            // Clear payment callbacks
            this.clearEventCallbacks('confirmPayment');
            this.clearEventCallbacks('cancelPayment');
        }

        
    }

    EmitCancel = () => {
        console.log('Emit cancel fired!');
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.#status !== 'WAITING_CONFIRM' && this.#status !== 'WAITING_CASH')
            return

        console.log('Correct status');

        // Return to idle status
        this.setStatusReady();

        console.log('Reset status');
        console.log(this.#status);

        // Fire a callback for the event
        this.#callbacks['cancelPayment']('Oперация отменена пользователем!');
        
        // Clear payment callbacks
        this.clearEventCallbacks('confirmPayment')
        this.clearEventCallbacks('cancelPayment')
        // Clear payment listeners
        if(this.#callbacks['cashIn']) this.clearEventCallbacks('cashIn');
        
        // Refund and clear the stash if user entered some money
        if(this.#stash) {
            this.returnChange(this.#stash);
            this.clearStash();
        }
        console.log(this);
    }

    /**
     * Placeholder emulating the return of change
     * @param {Number} amount Amount of money to return 
     */
    returnChange = (amount) => {
        // Placeholder logic
        console.log(`Выдал ${amount}р сдачи...`);
    }

    confirmPinCode = (pincode, emulateConfirm = true) => {
        // Placeholder logic
        console.log(`Пинкод: ${pincode} ${emulateConfirm ? '' : 'не'}был подтвержден!`);

        return emulateConfirm;
    }
}