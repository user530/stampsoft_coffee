import React from 'react';
import styles from './Products.module.scss';
import { useTimeout, useSelection, } from '../../hooks/products';
import sprite from '../../static/sprite.svg';
import { CategoryItem } from './categoryItem/CategoryItem';
import { ProductItem } from './productItem/ProductItem';
import { Popup } from './popup/Popup';
import { OptionSize } from './optionSize/OptionSize';
import { OptionAdvanced } from './optionAdvanced/OptionAdvanced';
import { useAppContext } from '../../hooks/context/AppContext';

export const Products = (props) => {
    const { next, prev } = props;
    
    const { state, dispatch } = useAppContext();
    const { storage, cart } = state;

    console.log(cart);

    // Clear the cart and return to the promo screen on long idle
    const timeoutCb = React.useCallback(
        () => { 
            dispatch({type: 'SET_CART', payload: null});
            prev();
        },
        []
    );
    // Activate idle handler
    useTimeout(timeoutCb);

    const clickHandler = React.useCallback(
        () => {
            console.log('Clicked Products!');
            next()
        },
        []
    );
    
    const {
        selectedCategory, 
        categoryProducts, 
        setSelectedCategory,
        setCategoryProducts
    } = useSelection(storage.categories[0]);

    const [sizePopupOpen, setSizePopupOpen] = React.useState(false);
    const closeSizePopup = React.useCallback(() => setSizePopupOpen(false), []);
    
    const [advancedPopupOpen, setAdvancedPopupOpen] = React.useState(false);
    const closeAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(false), []);
    const openAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(true), []);

    const categoryClickHandler = (category) => {
        setSelectedCategory(category);
        setCategoryProducts(category.products);
    }

    const productClickHandler = (product) => {
        // Create new cart selection based on the data (category, product, option)
        const newSelection = storage.generateCart(
            selectedCategory.id, 
            product.id, 
            product.sizes[0][0].optionId,
        );
        
        // Update cart data
        dispatch({type: 'SET_CART', payload: newSelection});
        setSizePopupOpen(true);
    };

    const sizeClickHandler = (sizeOptionId) => {
        const {categoryId, productId} = cart.product;
        
        // Create new selection with new size option (and current advanced options if any)
        const newSelection = storage.generateCart(
            categoryId, 
            productId, 
            sizeOptionId,
            cart.advancedOptions ? cart.advancedOptions : null,
        );
        
        // Update cart data
        dispatch({type: 'SET_CART', payload: newSelection});
    };

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
                    storage.categories.map(
                        (category) => {
                            const {id, name, img} = category;

                            return (
                                <CategoryItem 
                                    key={name + id} 
                                    name={name} 
                                    img={img} 
                                    clickHandler={() => categoryClickHandler(category)} 
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

                <div className={styles['products__content-wrapper']}>
                    <div className={styles['products__content']}>
                    {
                        categoryProducts.map(
                            (item) => {
                                const {id, name, img, sizes} = item;
                                
                                return (
                                    <ProductItem 
                                        key={id + name} 
                                        img={img} 
                                        name={name} 
                                        starterPrice={sizes[0][1]} 
                                        clickHandler={() => productClickHandler(item)}
                                    />
                                )
                            }
                        )
                    }
                </div>
                </div>
            </div>
            
            {
                (cart?.product?.productId) &&
                <Popup 
                key={1} 
                price={cart.totalAmount}
                isOpen={sizePopupOpen} 
                closeCb={closeSizePopup} 
                nextCb={clickHandler}
                >
                    <OptionSize
                        sizeClickCb={sizeClickHandler} 
                        advClickCb={openAdvancedPopup} 
                    />
                </Popup>
            }

            {
                (cart?.product?.productId) &&
                <Popup 
                    key={2} 
                    price={cart.totalAmount} 
                    isOpen={advancedPopupOpen} 
                    closeCb={closeAdvancedPopup} 
                    nextCb={clickHandler}
                    >
                        <OptionAdvanced />
                </Popup>
            }
            
            
        </section>
    )
}