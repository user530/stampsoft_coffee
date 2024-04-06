import React from 'react';
import styles from './PaymentFail.module.scss';
import { RxCross1 } from "react-icons/rx";

export const PaymentFail = (props) => {
    const { cancelCb, retryCb } = props;

    const retryClickHandler = () => {
        console.log('Clicked retry!');
        retryCb();
    }

    const cancelClickHandler = () => {
        console.log('Clicked cancel!');
        cancelCb();
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <div className={styles['content__image']}>
                    <RxCross1/>
                </div>
                <div className={styles['content__title']}>Оплата не прошла</div>
            </div>

            <div className={styles['controls']}>
                <button className={styles['retry']} onClick={retryClickHandler}>Попробовать еще раз</button>
                <button className={styles['cancel']} onClick={cancelClickHandler}>Отмена</button>
            </div>
        </div>
    )
}