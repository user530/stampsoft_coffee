import React from 'react';
import styles from './PayCash.module.scss';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useAppContext } from '../../hooks/context/AppContext';

export const PayCash = (props) => {
    const { next, prev, totalAmount } = props;
    const btnFillRef = React.useRef(null);
    
    const { state } = useAppContext();
    
    const { CashPurchase, EmitCashin, StopCashin, EmitConfirm, EmitCancel } = state.emulator;
    
    const [sumInputed, setSumInputed] = React.useState(0);
    
    const submitClickHandler = () => { next(); };
    const cancelClickHandler = () => { prev(); };

    const keyPressHandler = (e) => {
        if(e.key === '1')
            EmitCashin(10)
        else if(e.key === '2')
            EmitCashin(50)
        else if(e.key === '3')
            EmitCashin(100)
    };

    const handleCashin = (amount) => {
        console.log(`Handle cash in fired:`);
        console.log(`Current stash: ${sumInputed}`);
        console.log(`Sum required: ${totalAmount}`);
        console.log(`Amount inserted: ${amount}`);
        setSumInputed(prev => prev + amount);
    }

    React.useEffect(
        () => {
            console.log(sumInputed);
            if(sumInputed >= totalAmount) {
                StopCashin(() => {console.log('Cash In Stoped!')});
            }
        },
        [sumInputed]
    )

    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);
            // StartCashin(handleCashin)
            CashPurchase(
                handleCashin, 
                (result) => {
                    if(result) {
                        console.log('CONFIRM RESULT: ', result);
                        // Clear sumInputed
                        setSumInputed(0);
                        // Add to history?
                        next(result)();
                    }
                    else {
                        console.error('Failed to confirm cash operation');
                        // Is this scenario even possible?
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
                // onClick={submitClickHandler} 
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
                // onClick={cancelClickHandler}
                >Отмена</button>
            </div>
        </section>
    )
}