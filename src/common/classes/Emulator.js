export class Emulator {
    #status = 'READY';
    #callbacks = {};
    #events = ['cashIn', 'cardIn', 'confirmPayment', 'cancelPayment', 'paymentStatusUpdated'];
    #stash = 0;
    #cardInserted = false;
    #interupted = false;
    #chargedAmount = 0; 

    get status() {
        return this.#status;
    }
    
    set status(newStatus) {
        this.#status = newStatus;
    }

    get stash() {
        return this.#stash;
    }

    get cardInserted() {
        return this.#cardInserted;
    }

    insertCard = () => {
        this.#cardInserted = true;
        console.log('Card inserted!');
    }
    
    ejectCard = () => {
        this.#cardInserted = false;
        console.log('Card ejected!');
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

    setStatusWaitingCard = () => {
        this.#status = 'WAITING_CARD';
    }

    setStatusWaitingConfirm = () => {
        this.#status = 'WAITING_CONFIRM';
    }

    setStatusProcessingCard = () => {
        this.#status = 'PROCESSING_CARD';
    }

    clearInterupt = () => {
        this.#interupted = false;
    }

    interuptOperation = () => {
        this.#interupted = true;
    }

    chargeAmount = (amount) => {
        this.#chargedAmount = amount;
    }

    resetCharged = () => {
        this.#chargedAmount = 0;
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
        if( !cashAmount || typeof cashAmount !== 'number' || isNaN(cashAmount)) 
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

    BankCardPurchase = (amount, cb, display_cb, confirmCb, cancelCb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.#status !== 'READY') 
            return;
        
        // Update the status
        this.setStatusWaitingCard();

        // Charge purchase amount
        this.chargeAmount(amount);
        
        // Register callback
        this.registerCallback('cardIn', (success, reason = '') => cb(success, reason));
        this.registerCallback('paymentStatusUpdated', (status) => display_cb(status));
        this.registerCallback('confirmPayment', (result) => confirmCb(result));
        this.registerCallback('cancelPayment', (reason) => cancelCb(reason));
    }

    BankCardCancel = () => {
        // Clear callbacks, clear interupt flag, clear charged amount, eject the card
    }

    EmitCardIn = async (cardData) => {
        console.log('Emit cardIn fired');
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.#status !== 'WAITING_CARD') 
            return;

        // Placeholder function that validates data existence and format
        const argumentsCorrect = (cardData) => true;
        
        // Check argument 
        if( !cardData || !argumentsCorrect(cardData)) 
            return console.error('Provide valid card data!');

        // Set status
        this.setStatusProcessingCard();

        // Set card flag
        this.insertCard();

        // Initial status change before the first check
        this.EmitStatusUpdate('Обработка карты');
        
        try {
            // Emulate 1st check
            const check1 = await this.emulateCheck(true);
            if(!check1) throw new Error('Не удалось обработать карту!');
            
            this.EmitStatusUpdate('Связь с банком');

            // Emulate 2nd check
            const check2 = await this.emulateCheck(false);
            if(!check2) throw new Error('Не удалось связаться с банком!');
            
            this.EmitStatusUpdate('Проверка данных');

            // Emulate 3rd check
            const check3 = await this.emulateCheck(false);
            if(!check3) throw new Error('Неверные данные карты!');

            // Emulate amount check -> Here we pass amount to the bank to confirm
            const check4 = await this.emulateCheck(false, this.#chargedAmount);
            if(!check4) throw new Error('Недостаточно средств на карте!');

            this.EmitStatusUpdate('Подтвердите транзакцию');
            
            // If interuption flag was raised
            if(this.#interupted) throw new Error('Операция отменена пользователем!');
            
            this.setStatusWaitingConfirm();

            // Fire a callback for the event
            this.#callbacks['cardIn'](true);

            console.log(this);

        } catch (error) {
            this.setStatusReady();
            this.ejectCard();
            this.clearInterupt();

            return this.#callbacks['cardIn'](false, 'Не удалось обработать карту!');
        }
    }

    EmitStatusUpdate = (newStatus) => {
        if(this.#status !== 'PROCESSING_CARD') return;

        if(!newStatus)
            return console.error('Provide new status!');

        this.#callbacks['paymentStatusUpdated'](newStatus);
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

    /**
     * Emulate the check of validity of some data
     * @param {Boolean} isValid Emulated result that will be returned in the specified time 
     * @param {Number} timer Time in seconds to wait before the return 
     * @returns {Promise<Boolean>} Promise of the emulated result 
     */
    emulateCheck = async (isValid, timer = 2000) => new Promise(
            (resolve) => setTimeout(
                () => resolve(isValid),
                timer + Math.random() * 1000
            )
        );
}