import React from 'react';
import styles from './PayCash.module.scss';
import { FaRegMoneyBillAlt } from "react-icons/fa";

export const PayCash = (props) => {
    const { next, prev } = props;
    const btnFillRef = React.useRef(null);

    const sumRequired = 250;
    const [sumInputed, setSumInputed] = React.useState(0);
    
    const cancelClickHandler = () => { prev(); };

    const keyPressHandler = (e) => {
        if(e.key === '1') 
            setSumInputed(prev => prev < sumRequired ? prev + 10 : prev);
        else if(e.key === '2')
            setSumInputed(prev => prev < sumRequired ? prev + 50 : prev);
        else if(e.key === '3')
            setSumInputed(prev => prev < sumRequired ? prev + 100 : prev);
    }

    React.useEffect(
        () => {
            window.addEventListener('keydown', keyPressHandler);

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
                <button onClick={cancelClickHandler} className={styles['filled']}>
                    <span 
                    ref={ btnFillRef } 
                    className={styles['filled__overlay']} 
                    style={{width: `${sumInputed * 100/sumRequired}%`}}

                    ></span>
                    <span>
                        Оплатить
                    </span>
                </button>
                <button onClick={cancelClickHandler}>Отмена</button>
            </div>
        </section>
    )
}