export class Emulator {
    status = 'READY';
    callbacks = {};
    events = ['cashIn', 'cardIn', 'confirmPayment', 'cancelPayment', 'paymentStatusUpdated'];
    stash = 0;
    cardInserted = false;
    interupted = false;
    chargedAmount = 0; 

    insertCard = () => {
        this.cardInserted = true;
        console.log('Card inserted!');
    }
    
    ejectCard = () => {
        this.cardInserted = false;
        console.log('Card ejected!');
    }

    incrementStash = (addToStash) => {
        this.stash += addToStash;
    }

    clearStash = () => {
        this.stash = 0;
    }

    setStatusReady = () => {
        this.status = 'READY';
    }

    setStatusWaitingProductSelect = () => {
        this.status = 'WAITING_PRODUCT_SELECT';
    }

    setStatusWaitingProductVend = () => {
        this.status = 'WAITING_PRODUCT_VEND';
    }

    setStatusWaitingCash = () => {
        this.status = 'WAITING_CASH';
    }

    setStatusWaitingCard = () => {
        this.status = 'WAITING_CARD';
    }

    setStatusWaitingConfirm = () => {
        this.status = 'WAITING_CONFIRM';
    }

    setStatusProcessingCard = () => {
        this.status = 'PROCESSING_CARD';
    }

    setStatusProcessing = () => {
        this.status = 'PROCESSING';
    }

    clearInterupt = () => {
        this.interupted = false;
    }

    interuptOperation = () => {
        this.interupted = true;
    }

    chargeAmount = (amount) => {
        this.chargedAmount = amount;
    }

    resetCharged = () => {
        this.chargedAmount = 0;
    }

    isValidEvent = (eventName) => {
        return this.events.includes(eventName);
    }

    /**
     * Register callback for a specified event
     * @param {string} eventName Name of the event to listen to
     * @param {Function} cb Callback to fire each time event fires
     */
    registerCallback = (eventName, cb) => {
        if(typeof eventName !== 'string' 
            || !this.isValidEvent(eventName))
                return console.error('Cant register callback for the invalid event!');
        
        this.callbacks[eventName] = cb;
    }

    /**
     * Clear all events associated with the specified event
     * @param {string} eventName Name of the event to clear 
     */
    clearEventCallbacks = (eventName) => {
        if(typeof eventName !== 'string' 
            || !this.isValidEvent(eventName))
                return console.error('Cant register callback for the invalid event!');

        this.callbacks[eventName] = null;
    }
    
    /**
     * Start listening to the 'cashIn' events and fire callback with a value of the inputed bill
     * @param {Function} cb Callback to fire each time event fires
     */
    StartCashin = (cb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.status !== 'READY') 
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
        if(this.status !== 'WAITING_CASH')
            return;

        // Check argument 
        if( !cashAmount || typeof cashAmount !== 'number' || isNaN(cashAmount)) 
            return console.error('Provide valid cash amount!');

        // Placeholder cashin event, later change to a creator method
        const cashinEvent = { name: 'cashIn', amount: cashAmount };

        // Add to stash
        this.incrementStash(cashAmount);

        // Fire a callback for the event
        this.callbacks[cashinEvent.name](cashinEvent);
    }

    /**
     * Stops listening to the 'cashIn' events, clears callback and fires callback at the end
     * @param {Function} cb Callback to fire at the end of
     */
    StopCashin = (cb) => {
        // Skip, if emulator currently not listening to the 'cashIn' events
        if(this.status !== 'WAITING_CASH') return;

        // Clear events and fire callback
        this.clearEventCallbacks('cashIn');
        this.setStatusWaitingConfirm();
        cb();
    }

    CashPurchase = (cashInCb, confirmCb, cancelCb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.status !== 'READY') 
            return;
        
        this.registerCallback('confirmPayment', (result) => confirmCb(result));
        this.registerCallback('cancelPayment', (reason) => cancelCb(reason));

        this.StartCashin(cashInCb);
    }

    EmitConfirm = async (confirmData) => {
        console.log('Emit confirm fired');
    
        // Skip, if emulator currently not listening to the 'confirm' events
        if(this.status !== 'WAITING_CONFIRM')
            return;
    
        const { type, change, pincode, interupt } = confirmData;

        // Set status to prevent other interactions
        this.setStatusProcessing();

        // If confirming cash payment -> return change
        if( type === 'cash'){
            console.log('Cash payment');

            // Return the user change (if any) and clear the stash
            if(change) this.returnChange(change);
            this.clearStash();

            console.log(this.status);

            // Fire a callback for the event, there is no 'failed' confirm so pass true
            this.callbacks['confirmPayment'](true);
        }

        if(type === 'card') {
            // Set status
            this.callbacks['paymentStatusUpdated']('Ожидаем подтверждение');
            
            // Handle card confirmation process
            try {
                // Handle 'interupt' if confirm (In future add some logic to inform the bank)
                if(interupt)
                    throw new Error('Oперация подтверждения отменена пользователем!');
                
                // Emulate pin code check
                const pinCheck = await this.emulateCheck(pincode > 5000, 5000);

                // Wrong pin code
                if(!pinCheck)
                     throw new Error('Неверный PIN код!');
                
                // Confirm charged amount
                console.log(`Списано по банковской карте: ${this.chargedAmount}р`);

                // Successful confirm
                this.callbacks['confirmPayment'](true);

            } catch (error) {
                this.callbacks['confirmPayment'](false, error.message || 'Непредвиденная ошибка!');
            } finally {
                // Clean up logic
                this.ejectCard();
                this.resetCharged();
                this.clearInterupt();
            }
        }

        // Return to idle status
        this.setStatusReady();

        // Clear payment callbacks
        this.clearEventCallbacks('confirmPayment');
        this.clearEventCallbacks('cancelPayment');
    }

    EmitCancel = () => {
        console.log('Emit cancel fired!');

        // Skip, if emulator currently not listening to cancelable events
        if(
            this.status !== 'WAITING_CONFIRM' 
            && this.status !== 'WAITING_CASH' 
            && this.status !== 'WAITING_CARD'
            && this.status !== 'PROCESSING_CARD'
        )
            return

        // If currently processing the card -> raise interruption flag and leave at that for gracefull cancel
        if(this.status === 'PROCESSING_CARD')
            return this.interuptOperation();
        
        console.log('Correct status');

        // Return to idle status
        this.setStatusReady();

        console.log('Reset status');
        console.log(this.status);

        // Fire a callback for the event
        this.callbacks['cancelPayment']('Oперация отменена пользователем!');
        
        // Clear payment callbacks
        this.clearEventCallbacks('confirmPayment')
        this.clearEventCallbacks('cancelPayment')

        // Clear payment listeners
        if(this.callbacks['cashIn']) this.clearEventCallbacks('cashIn');
        if(this.callbacks['cardIn']) this.clearEventCallbacks('cardIn');
        if(this.callbacks['paymentStatusUpdated']) this.clearEventCallbacks('paymentStatusUpdated');
        
        // Refund and clear the stash if user entered some money
        if(this.stash) {
            this.returnChange(this.stash);
            this.clearStash();
        }

        // Eject card if any inserted
        if(this.cardInserted) {
            this.ejectCard();
        }

        // Clear payment data
        this.chargedAmount = 0;
        
        console.log(this);
    }

    BankCardPurchase = (amount, cb, display_cb, confirmCb, cancelCb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.status !== 'READY') 
            return;
        
        // Update the status
        this.setStatusWaitingCard();

        // Charge purchase amount
        this.chargeAmount(amount);
        
        // Register callback
        this.registerCallback('cardIn', (success, reason = '') => cb(success, reason));
        this.registerCallback('paymentStatusUpdated', (status) => display_cb(status));
        this.registerCallback('confirmPayment', (success, result) => confirmCb(success, result));
        this.registerCallback('cancelPayment', (reason) => cancelCb(reason));
    }

    BankCardCancel = () => {
        // Clean up logic
        this.ejectCard();
        this.resetCharged();
        this.clearInterupt();

        // Return to idle status
        this.setStatusReady();

        // Clear callbacks
        this.clearEventCallbacks('cashIn');
        this.clearEventCallbacks('cardIn');
        this.clearEventCallbacks('paymentStatusUpdated');
        this.clearEventCallbacks('confirmPayment');
        this.clearEventCallbacks('cancelPayment');
    }

    EmitCardIn = async (cardData) => {
        console.log('Emit cardIn fired');
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.status !== 'WAITING_CARD') 
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
            const check1 = await this.emulateCheck(cardData.data1);
            if(!check1) throw new Error('Не удалось обработать карту!');
            
            this.EmitStatusUpdate('Связь с банком');

            // Emulate 2nd check
            const check2 = await this.emulateCheck(cardData.data2);
            if(!check2) throw new Error('Не удалось связаться с банком!');
            
            this.EmitStatusUpdate('Проверка данных');

            // Emulate 3rd check
            const check3 = await this.emulateCheck(cardData.data3);
            if(!check3) throw new Error('Неверные данные карты!');

            // Emulate amount check -> Here we pass amount to the bank to confirm
            const check4 = await this.emulateCheck(cardData.data4, this.chargedAmount);
            if(!check4) throw new Error('Недостаточно средств на карте!');

            this.EmitStatusUpdate('Подтвердите транзакцию');
            console.log(this.interupted);
            // If interuption flag was raised
            if(this.interupted) throw new Error('Операция отменена пользователем!');
            
            this.setStatusWaitingConfirm();

            // Fire a callback for the event
            this.callbacks['cardIn'](true);

            console.log(this);

        } catch (error) {
            this.setStatusReady();
            this.ejectCard();
            this.resetCharged();
            this.clearInterupt();

            return this.callbacks['cardIn'](false, error.message || 'Непредвиденная ошибка!');
        }
    }

    EmitStatusUpdate = (newStatus) => {
        if(this.status !== 'PROCESSING_CARD') return;

        if(!newStatus)
            return console.error('Provide new status!');

        this.callbacks['paymentStatusUpdated'](newStatus);
    }

    Vending = (cb) => {
        /* Skip, if emulator is already busy with some other task  */ 
        if(this.status !== 'READY') 
            return;
        
        this.registerCallback('selectProduct', (product_idx) => this.setSelection(product_idx));
        this.registerCallback('vendProduct', (product_idx) => cb(product_idx));

        // this.Se
    // Выдача кофе с индексом product_idx (индексы в порядке, в котором они идут на
    // первом экране)
    // Активация успешной или неуспешной выдачи должна производится по нажатию
    // комбинаций клавиш - на ваше усмотрение
    // При успешной / неуспешной транзакции выполняется cb (result), где result - результат
    // операции (true/false)
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
     * @param {boolean} isValid Emulated result that will be returned in the specified time 
     * @param {number} timer Time in seconds to wait before the return 
     * @returns {Promise<boolean>} Promise of the emulated result 
     */
    emulateCheck = async (isValid, timer = 2000) => new Promise(
            (resolve) => setTimeout(
                () => resolve(isValid),
                timer + Math.random() * 1000
            )
        );
}