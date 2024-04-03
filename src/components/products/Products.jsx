import React from 'react';
import styles from './Products.module.scss';
import { useTimeout } from '../../hooks/products/useTimeout';
import sprite from '../../static/sprite.svg';

export const Products = (props) => {
    const { productData, next, prev, setSelectedProduct, } = props;

    const onTimeout = () => { 
        setSelectedProduct(null); 
        // prev();
    };
    const nextCard = () => next('card');
    const nextCash = () => next('cash');

    useTimeout(onTimeout);

    const [selectedCategory, setSelectedCategory] = React.useState(productData[0] || '');    
    const [categoryProducts, setCategoryProducts] = React.useState(selectedCategory.products || []);

    return (
        <section className={`${styles['wrapper']} ${styles['theme-'+selectedCategory.id]}`}>
            <div className={styles['heading']}>
                <h2 className={styles['h4']}>Выбор напитка</h2>
                <svg className={styles['heading-decor']}>
                    <use href={`${sprite}#products_decor`}></use>
                </svg>
            </div>
            
            <div className={styles['categories']}>
                {
                    productData.map(
                        (category) => {
                            const {id, name, img} = category;
                            return (
                                <div 
                                key={name + id} 
                                onClick={() => setSelectedCategory(category)}
                                className={`${styles['category-item']} ${name === selectedCategory.name ? styles['active'] : ''}
                                `}
                                >
                                    <div className={styles['category-item__img']}>
                                        <img src={img} alt={name} width={256} height={256}/>
                                    </div>
                                    <p className={styles['text-small']}>{name}</p>
                                </div>
                            )
                        }
                    )
                }
            </div>
            
            <button onClick={nextCard}>Pay Card</button>
            <button onClick={nextCash}>Pay Cash</button>
            <button onClick={() => setSelectedProduct(42)}>Product</button>
        </section>
    )
}