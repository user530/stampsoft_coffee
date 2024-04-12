import React from 'react';
import styles from './OptionSize.module.scss';
import { useAppContext } from '../../../hooks/context/AppContext';

export const OptionSize = (props) => {
    const { sizeClickCb, advClickCb } = props;

    const { state } = useAppContext();
    const { 
        storage, 
        cart: { product: { categoryId, productId, sizeId } } 
    } = state;
    
    const selectedCategory = storage.getCategoryById(categoryId);
    const { img, name, sizes } = selectedCategory.getProductById(productId);
    
    const optionsMetadata = sizes.map(sizePricePair => sizePricePair[0]);

    return ( 
        <div className={styles['wrapper']}>  
            <div className={styles['option__img']}>
                <img src={ img } alt={ name } />
            </div>

            <h2 className={styles['option__name']}>{ name }</h2>

            <div className={styles['option__btns']}>
                {
                    optionsMetadata.map(
                        ({ optionId, optionName, optionImg, optionImgHeight }) => (
                            <div 
                            key={optionId + optionName} 
                            className={
                                `${styles['option__item']} ${optionId === sizeId ? styles['active'] : ''}` 
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