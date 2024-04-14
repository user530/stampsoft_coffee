import React from 'react';
import styles from './PayCard.module.scss';
import sprite from '../../static/sprite.svg';
import { PinPad } from './pinPad/PinPad';
import { useAppContext } from '../../hooks/context/AppContext';
import { Order } from '../../common/classes';

export const PayCard = (props) => {
    const { next, prev } = props;

    const nextSuccess = next(true);
    const nextFailure = next(false);
    
    const { state: { emulator, cart, storage }, dispatch } = useAppContext();
    
    const { BankCardPurchase, EmitCardIn, EmitCancel, EmitConfirm } = emulator;
    const { product, advancedOptions, totalAmount } = cart;

    const { categoryId, productId, sizeId } = product;
    const cartProduct = storage.getProductByCategoryId(categoryId, productId);
    
    const cancelClickHandler = () => { EmitCancel(); };

    /**
     * Emulate card input: Press "1" to emulate valid card or press numbers "2" to "5" to emulate invalid card with different fail causes
     * @param {KeyboardEvent} e Keydown effect representing different card emulations
     */
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

    // Send interrupt and hide pinpad
    const closePinpad = React.useCallback(
        () => {
            EmitConfirm({type: 'card', interupt: true});
            setShowPinpad(false);
        }, []);

    // Emit payment confirm and supply user pincode
    const submitPin = React.useCallback(
        (pincode) => {
            EmitConfirm({type: 'card', pincode});
        }, []);

    // On component start add keydown listener to handle card input emulations and initiate card purchase
    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);

            BankCardPurchase(
                totalAmount, 
                (result, reason) => {
                    if(result) {
                        setShowPinpad(true);
                    }
                    else {
                        nextFailure(reason);
                    }
                }, 
                (newStatus) => { 
                    setStatusText(newStatus);
                }, 
                (result, reason) => {
                    if(result){
                        // Reduce the amount of the specified product
                        cartProduct.deductSingleOptionSize(sizeId);

                        // Add purchase data to the story
                        dispatch({type: 'SAVE_ORDER_INFO', payload: new Order(
                            categoryId,
                            productId,
                            sizeId,
                            advancedOptions,
                            totalAmount,
                            'CARD',
                        )});

                        nextSuccess();
                    }
                    else {
                        nextFailure(reason);
                    }
                }, 
                () => {
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
                <div className={styles['content__block']}>
                    <div className={styles['content__img']}>
                        <svg>
                            <use href={`${sprite}#card_symbol`}/>
                        </svg>
                    </div>
                    <h3 className={styles['content__title']}>{statusText}</h3>

                </div>
            </div>

            <button onClick={cancelClickHandler}>Отмена</button>

            <PinPad isActive={showPinpad} closeCb={closePinpad} sumbitCb={submitPin}/>
        </section>
    )
}