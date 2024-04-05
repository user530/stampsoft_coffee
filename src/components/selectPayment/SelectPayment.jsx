import React from 'react';
import styles from './SelectPayment.module.scss';
import sprite from '../../static/sprite.svg';
import { FaAngleLeft } from "react-icons/fa6";

export const SelectPayment = (props) => {
    const { prev, nextCash, nextCard } = props;

    return (
        <section className={styles['wrapper']}>
            <button 
                className={styles['button-back']}
                onClick={prev}
            >
                <FaAngleLeft/>
            </button>

            <div className={styles['content']}>
                <div className={styles['content__img']}>
                    <svg>
                        <use href={`${sprite}#ruble_symbol`}/>
                    </svg>
                </div>

                <h3 className={styles['content__title']}>
                    Выберите метод оплаты:
                </h3>
            </div>

            <div className={styles['buttons-selection']}>
                <button 
                    className={styles['button-accented']}
                    onClick={nextCash}
                >
                    Наличными
                </button>

                <button
                    onClick={nextCard}
                >
                    Картой
                </button>
            </div>
        </section>
    )
}