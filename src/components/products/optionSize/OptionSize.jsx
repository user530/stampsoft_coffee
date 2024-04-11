import React from 'react';
import styles from './OptionSize.module.scss';

export const OptionSize = (props) => {
    const { productName, productImg, productOptions, sizeClickCb, advClickCb } = props;

    const optionsMetadata = productOptions.map(sizePricePair => sizePricePair[0]);

    const [selectedSize, setSelectedSize] = React.useState(optionsMetadata[0].optionId);

    return ( 
        <div className={styles['wrapper']}>  
            <div className={styles['option__img']}>
                <img src={ productImg } alt={ productName } />
            </div>

            <h2 className={styles['option__name']}>{ productName }</h2>

            <div className={styles['option__btns']}>
                {
                    optionsMetadata.map(
                        ({ optionId, optionName, optionImg, optionImgHeight }, optionPrice) => (
                            <div 
                            key={optionId + optionName} 
                            className={
                                `${styles['option__item']} ${selectedSize === optionId ? styles['active'] : ''}` 
                            }
                            onClick={
                                () => {
                                    setSelectedSize(optionId);
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