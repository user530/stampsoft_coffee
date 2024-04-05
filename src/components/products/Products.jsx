import React from 'react';
import styles from './Products.module.scss';
import { useTimeout, useSelection, } from '../../hooks/products';
import sprite from '../../static/sprite.svg';
import { CategoryItem } from './categoryItem/CategoryItem';
import { ProductItem } from './productItem/ProductItem';
import { Popup } from './popup/Popup';
import { OptionSize } from './optionSize/OptionSize';
import { OptionAdvanced } from './optionAdvanced/OptionAdvanced';

export const Products = (props) => {
    const { productData, next, prev, setSelectedProduct, } = props;

    const onTimeout = React.useCallback(
        () => { 
            setSelectedProduct(null); 
            // prev();
        },
        []
    );

    const clickHandler = React.useCallback(
        () => {
            console.log('Clicked Products!');
            next()
        },
        []
    );

    useTimeout(onTimeout);
    const {
        selectedCategory, 
        categoryProducts, 
        setSelectedCategory
    } = useSelection(productData[0]);

    const [selectedItem, setSelectedItem] = React.useState(selectedCategory.products[0] || {name: '', img: ''});

    const [sizePopupOpen, setSizePopupOpen] = React.useState(false);
    const closeSizePopup = React.useCallback(() => setSizePopupOpen(false), []);
    
    const [advancedPopupOpen, setAdvancedPopupOpen] = React.useState(false);
    const closeAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(false), []);
    const openAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(true), []);

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
                            (item) => {
                                const {id, name, img, starterPrice} = item;

                                return (
                                    <ProductItem 
                                        key={id + name} 
                                        img={img} 
                                        name={name} 
                                        starterPrice={starterPrice} 
                                        clickHandler={()=>{
                                            setSelectedItem(item);
                                            setSizePopupOpen(true);
                                        }}
                                    />
                                )
                            }
                        )
                    }
                </div>
            </div>
            
            <Popup 
            key={1} 
            price={229} 
            isOpen={sizePopupOpen} 
            closeCb={closeSizePopup} 
            nextCb={clickHandler}
            >
                <OptionSize 
                sizeClickCb={()=>console.log('Size selected!')} 
                advClickCb={openAdvancedPopup} 
                productName={selectedItem.name} 
                productImg={selectedItem.img} />
            </Popup>

            <Popup 
            key={2} 
            price={229} 
            isOpen={advancedPopupOpen} 
            closeCb={closeAdvancedPopup} 
            nextCb={clickHandler}
            >
                <OptionAdvanced />
            </Popup>
            
        </section>
    )
}