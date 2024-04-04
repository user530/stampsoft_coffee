import React from 'react';
import styles from './Products.module.scss';
import { useTimeout, useSelection, } from '../../hooks/products';
import sprite from '../../static/sprite.svg';
import { CategoryItem } from './categoryItem/CategoryItem';
import { ProductItem } from './productItem/ProductItem';

export const Products = (props) => {
    const { productData, next, prev, setSelectedProduct, } = props;

    const onTimeout = () => { 
        setSelectedProduct(null); 
        // prev();
    };
    const nextCard = () => next('card');
    const nextCash = () => next('cash');

    useTimeout(onTimeout);
    const {
        selectedCategory, 
        categoryProducts, 
        setSelectedCategory
    } = useSelection(productData[0]);

    return (
        <section className={`${styles['wrapper']} ${styles['theme-' + selectedCategory.id]}`}>
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
                                <CategoryItem 
                                    key={name + id} 
                                    name={name} 
                                    img={img} 
                                    clickHandler={() => setSelectedCategory(category)} 
                                    isSelected={name === selectedCategory.name} 
                                />
                            )
                        }
                    )
                }
            </div>

            <div className={styles['products']}>
                <header className={styles['products__header']}>
                    <h2 className={styles['h2']}>{selectedCategory.name}</h2>
                </header>

                <div className={styles['products__content']}>
                    {
                        categoryProducts.map(
                            ({id, name, img, starterPrice}) => (
                                <ProductItem 
                                    key={id + name} 
                                    img={img} 
                                    name={name} 
                                    starterPrice={starterPrice} 
                                    clickHandler={()=>console.log(id)}
                                />
                            )
                        )
                    }
                </div>
            </div>
            
            <button onClick={nextCard}>Pay Card</button>
            <button onClick={nextCash}>Pay Cash</button>
            <button onClick={() => setSelectedProduct(42)}>Product</button>
        </section>
    )
}