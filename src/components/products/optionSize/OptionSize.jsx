import React from 'react';
import styles from './OptionSize.module.scss';
import sprite from '../../../static/sprite.svg';

export const OptionSize = (props) => {
    const { productName, productImg, sizeClickCb, advClickCb } = props;

    const options = [
        {
            id: 1,
            value: '200 мл.',
            iconSrc: `${sprite}#cup_symbol`,
            iconSize: 119,
        },
        {
            id: 2,
            value: '300 мл.',
            iconSrc: `${sprite}#cup_symbol`,
            iconSize: 143,
        },
        {
            id: 3,
            value: '400 мл.',
            iconSrc: `${sprite}#cup_symbol`,
            iconSize: 174,
        },
    ]

    const [selectedSize, setSelectedSize] = React.useState(options[0].id);

    return ( 
        <div className={styles['wrapper']}>  
            <div className={styles['option__img']}>
                <img src={ productImg } alt={ productName } />
            </div>

            <h2 className={styles['option__name']}>{ productName }</h2>

            <div className={styles['option__btns']}>
                {
                    options.map(
                        ({ id, value, iconSrc, iconSize }) => (
                            <div 
                            key={id + value} 
                            className={
                                `${styles['option__item']} ${selectedSize === id ? styles['active'] : ''}` 
                            }
                            onClick={() => setSelectedSize(id)}
                            >
                                <div>
                                    <svg height={iconSize}><use href={iconSrc}/></svg>
                                </div> 
                                
                                <span>{value}</span>
                            </div>
                        )
                    )
                }
            </div>
            
            <button 
            className={styles['options-advanced']}
            onClick={advClickCb}
            >Хотите добавить сироп?</button>
        </div>
        
    )
}