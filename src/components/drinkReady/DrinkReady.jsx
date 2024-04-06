import React from 'react';
import styles from './DrinkReady.module.scss';
import { FullscreenBlock } from '../fullscreenBlock/FullscreenBlock';
import sprite from '../../static/sprite.svg';

export const DrinkReady = (props) => {
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
        <FullscreenBlock bgColor={'#F5D009'}>
            <div className={styles['content']}>
                <div className={styles['content__img']}>
                    <svg>
                        <use href={`${sprite}#cup_symbol`} style={{'--colLabel': '#F5D009', '--colMark': 'black'}}/>
                    </svg>
                </div>
                <p className={styles['content__title']}>Напиток готов</p>
                <p className={styles['content__subtitle']}>вы можете его забрать</p>
            </div>
        </FullscreenBlock>
    )
}