import React from 'react';
import styles from './NoProduct.module.scss';
import { FullscreenBlock } from '../fullscreenBlock/FullscreenBlock';
import sprite from '../../static/sprite.svg';
import { useAppContext } from '../../hooks/context/AppContext';

export const NoProduct = (props) => {
    const { backCb } = props;

    const { dispatch } = useAppContext();

    const cancelClickHandler = () => {
        // Clean up the cart
        dispatch({type: 'SET_CART', payload: {}});
        backCb();
    }
    
    return (
        <FullscreenBlock bgColor={'#F58809'}>
            <div className={styles['content']}>
                <div className={styles['content__image']}>
                    <svg>
                        <use href={`${sprite}#warning_symbol`}/>
                    </svg>
                </div>
                <div className={styles['content__title']}>Данного напитка нет&nbsp;в&nbsp;наличии</div>
            </div>

            <div className={styles['controls']}>
                <button className={styles['cancel']} onClick={cancelClickHandler}>Вернуться на главную</button>
            </div>
        </FullscreenBlock>
    )
}