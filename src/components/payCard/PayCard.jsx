import React from 'react';
import styles from './PayCard.module.scss';
import sprite from '../../static/sprite.svg';
import { PinPad } from './pinPad/PinPad';

export const PayCard = (props) => {
    const { next, prev } = props;
    
    const cardInputHandler = (success) => { 
        if(showPinpad) return;
        
        console.log('Card input handler');
        setShowPinpad(true);
    };

    const cancelClickHandler = () => { prev(); };

    const keyPressHandler = (e) => {
        if(e.key === '1') 
            cardInputHandler(true);
        else if(e.key === '2')
            cardInputHandler(false);
    }
    
    const [showPinpad, setShowPinpad] = React.useState(false);
    const closePinpad = React.useCallback(() => setShowPinpad(false), []);

    const submitPin = React.useCallback((pincode) => {console.log('Pincode: ' + pincode)}, []);

    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);

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
                <h3 className={styles['content__title']}>Приложите карту к&nbsp;терминалу</h3>
            </div>

            <button onClick={cancelClickHandler}>Отмена</button>

            <PinPad isActive={showPinpad} closeCb={closePinpad} sumbitCb={submitPin}/>
        </section>
    )
}