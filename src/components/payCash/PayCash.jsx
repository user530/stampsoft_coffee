import React from 'react';
import styles from './PayCash.module.scss';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useAppContext } from '../../hooks/context/AppContext';
import { Order } from '../../common/classes';

export const PayCash = (props) => {
    const { next, prev } = props;
    const btnFillRef = React.useRef(null);

    const nextSuccess = next(true);
    const nextFailure = next(false);
    
    const { state: { emulator, cart, storage }, dispatch } = useAppContext();
    
    const { CashPurchase, EmitCashin, StopCashin, EmitConfirm, EmitCancel } = emulator;
    const { product, advancedOptions, totalAmount } = cart;

    const { categoryId, productId, sizeId } = product;
    const cartProduct = storage.getProductByCategoryId(categoryId, productId);

    const [sumInputed, setSumInputed] = React.useState(0);

    /**
     * Emulate cash input: Press "1" to emulate input of 10rub bill, "2" for 50rub and "3" for 100rub
     * @param {KeyboardEvent} e Keydown effect representing different card emulations
     */
    const keyPressHandler = (e) => {
        if(e.key === '1')
            EmitCashin(10)
        else if(e.key === '2')
            EmitCashin(50)
        else if(e.key === '3')
            EmitCashin(100)
    };

    const handleCashin = (amount) => {
        setSumInputed(prev => prev + amount);
    }

    
    React.useEffect(
        () => {
            if(sumInputed >= totalAmount) {
                StopCashin(() => {});
            }
        },
        [sumInputed]
    )

    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);
            
            // On component start add keydown listener to handle cash input emulations and initiate cash purchase
            CashPurchase(
                handleCashin, 
                (result) => {
                    if(result) {
                        // Clear sumInputed
                        setSumInputed(0);

                        // Reduce the amount of the specified product
                        cartProduct.deductSingleOptionSize(sizeId);

                        // Add purchase data to the story
                        dispatch({type: 'SAVE_ORDER_INFO', payload: new Order(
                            categoryId,
                            productId,
                            sizeId,
                            advancedOptions,
                            totalAmount,
                            'CASH',
                        )});
                        
                        nextSuccess();
                    }
                    else {
                        // Is this scenario even possible?
                        console.error('Failed to confirm cash operation');
                        nextFailure();
                    }
                }, 
                (reason) => {
                    console.error(reason);
                    prev();
                }
            )

            return () => window.removeEventListener('keydown', keyPressHandler);
        },
        []
    )

    return (
        <section className={styles['wrapper']}>
            <div className={styles['content']}>
                <div className={styles['content__img']}>
                    <FaRegMoneyBillAlt/>
                </div>
                
                <h3 className={styles['content__title']}>Вставьте купюры в купюроприёмник</h3>
            </div>

            <div className={styles['control-buttons']}>
                <button 
                onClick={
                    () => EmitConfirm({type: 'cash', change: sumInputed - totalAmount })
                }
                className={styles['filled']} disabled={sumInputed < totalAmount}>
                    <span 
                    ref={ btnFillRef } 
                    className={styles['filled__overlay']} 
                    style={{width: `${sumInputed * 100/totalAmount}%`}}

                    ></span>
                    <span>
                        { sumInputed < totalAmount ? `Внесено: ${sumInputed} / ${totalAmount}` : 'Оплатить'}
                    </span>
                </button>

                <button 
                    onClick={ () => EmitCancel()}
                >Отмена</button>
            </div>
        </section>
    )
}