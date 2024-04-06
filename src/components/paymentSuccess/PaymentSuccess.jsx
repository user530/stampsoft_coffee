import React from 'react';
import styles from './PaymentSuccess.module.scss';
import { FullscreenBlock } from '../fullscreenBlock/FullscreenBlock';
import { RxCheck } from "react-icons/rx";

export const PaymentSuccess = (props) => {
    const { nextCb, delay } = props;

    React.useEffect(
        () => {
            const timeout = setTimeout(
                nextCb,
                delay ?? 3000
            );

            return () => clearTimeout(timeout);
        },
        []
    )

    return (
        <FullscreenBlock bgColor={'#45F03B'}>
            <div className={styles['content']}>
                <div className={styles['content__image']}>
                    <RxCheck/>
                </div>
                <div className={styles['content__title']}>Оплата прошла успешно</div>
            </div>
        </FullscreenBlock>
    )
}