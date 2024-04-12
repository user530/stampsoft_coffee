import React from 'react';
import styles from './OptionSize.module.scss';

export const OptionSize = (props) => {
    const { sizeOption, productName, productImg, productOptions, sizeClickCb, advClickCb } = props;

    const optionsMetadata = productOptions.map(sizePricePair => sizePricePair[0]);

    return ( 
        <div className={styles['wrapper']}>  
            <div className={styles['option__img']}>
                <img src={ productImg } alt={ productName } />
            </div>

            <h2 className={styles['option__name']}>{ productName }</h2>

            <div className={styles['option__btns']}>
                {
                    optionsMetadata.map(
                        ({ optionId, optionName, optionImg, optionImgHeight }) => (
                            <div 
                            key={optionId + optionName} 
                            className={
                                `${styles['option__item']} ${sizeOption === optionId ? styles['active'] : ''}` 
                            }
                            onClick={
                                () => {
                                    sizeClickCb(optionId);
                                }
                            }
                            >
                                <div>
                                    <svg height={optionImgHeight}><use href={optionImg}/></svg>
                                </div> 
                                
                                <span>{optionName}</span>
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