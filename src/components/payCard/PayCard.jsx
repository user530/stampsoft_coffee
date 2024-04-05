import React from 'react';
import styles from './PayCard.module.scss';
import sprite from '../../static/sprite.svg';

export const PayCard = (props) => {
    const { next, prev } = props;

    const cardInputHandler = () => { next(); };
    const clickHandler = () => { prev(); };
    
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

            <button onClick={clickHandler}>Отмена</button>
        </section>
    )
}