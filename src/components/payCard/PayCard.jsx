import React from 'react';
import styles from './PayCard.module.scss';
import sprite from '../../static/sprite.svg';
import { PinPad } from './pinPad/PinPad';
import { useAppContext } from '../../hooks/context/AppContext';

export const PayCard = (props) => {
    const { next, prev } = props;

    const amountToPay = 250;

    const nextSuccess = next(true);
    const nextFailure = next(false);
    
    const {state, dispatch} = useAppContext();
    console.log(state.emulator);
    const {BankCardPurchase, EmitCardIn, EmitCancel, EmitConfirm} = state.emulator;

    const cardInputHandler = (success) => { 
        if(showPinpad) return;
        
        console.log('Card input handler');
        setShowPinpad(true);
    };

    const cancelClickHandler = () => { EmitCancel(); };

    const keyPressHandler = (e) => {
        if(e.key === '1') 
            EmitCardIn({data1: true, data2: true, data3: true, data4: true,})
        else if(e.key === '2')
            EmitCardIn({data1: false, data2: true, data3: true, data4: false,})
        else if(e.key === '3')
            EmitCardIn({data1: true, data2: false, data3: true, data4: false,})
        else if(e.key === '4')
            EmitCardIn({data1: true, data2: true, data3: false, data4: false,})
        else if(e.key === '5')
            EmitCardIn({data1: true, data2: true, data3: true, data4: false,})
    }
    
    const [statusText, setStatusText] = React.useState('Приложите карту к терминалу');
    const [showPinpad, setShowPinpad] = React.useState(false);

    const closePinpad = React.useCallback(
        () => {
            EmitConfirm({type: 'card', interupt: true});
            setShowPinpad(false);
        }, []);

    const submitPin = React.useCallback(
        (pincode) => {
            console.log('Pincode: ' + pincode);
            EmitConfirm({type: 'card', pincode});
        }, []);

    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);
            BankCardPurchase(
                250, 
                (result, reason) => {
                    console.log(`Card purchase CB fired! Processing result: ${result}`);
                    if(result) {
                        console.log('CB - Success', result, reason);
                        setShowPinpad(true);
                    }
                    else {
                        console.log('CB - Failure', result, reason);
                        nextFailure(reason);
                    }
                }, 
                (newStatus) => {
                    console.log('Display CB fired!'); 
                    setStatusText(newStatus);
                }, 
                (result, reason) => {
                    console.log('Confirm CB fired!');
                    if(result){
                        console.log('Confirm CB - Success');
                        nextSuccess();
                    }
                    else {
                        console.log('Confirm CB - Success');
                        nextFailure(reason);
                    }
                }, 
                () => {
                    console.log('Cancel CB fired!');
                    prev();
                });

            return () => {
                window.removeEventListener('keydown', keyPressHandler);
            }
        },
        []
    )
    
    return (
        <section className={styles['wrapper']}>
            <div className={styles['content']}>
                <div className={styles['content__img']}>
                    <svg>
                        <use href={`${sprite}#card_symbol`}/>
                    </svg>
                </div>
                <h3 className={styles['content__title']}>{statusText}</h3>
            </div>

            <button onClick={cancelClickHandler}>Отмена</button>

            <PinPad isActive={showPinpad} closeCb={closePinpad} sumbitCb={submitPin}/>
        </section>
    )
}