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
    const { storageData, next, prev, cartItem, setCartItem } = props;
    console.log('Products fired!');
    
    const onTimeout = React.useCallback(
        () => { 
            // setCartItem({
            //     product: { 
            //         productId: null, 
            //         sizeId: null
            //     },
            //     advancedOptions: {},
            //     totalAmount: 0,
            // });
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
    } = useSelection(storageData.categories[0]);

    // Get the selected product if there is any
    const selectedProduct = cartItem?.product?.productId && selectedCategory.getProductById(cartItem.product.productId);

    const [sizePopupOpen, setSizePopupOpen] = React.useState(false);
    const closeSizePopup = React.useCallback(() => setSizePopupOpen(false), []);
    
    const [advancedPopupOpen, setAdvancedPopupOpen] = React.useState(false);
    const closeAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(false), []);
    const openAdvancedPopup = React.useCallback(() => setAdvancedPopupOpen(true), []);

    const categoryClickHandler = (category) => setSelectedCategory(category);

    const productClickHandler = (product) => {
        console.log(cartItem.advancedOptions);
        // Create new cart selection based on the data (category, product, option)
        const newSelection = storageData.generateCart(
            selectedCategory.id, 
            product.id, 
            product.sizes[0][0].optionId,
        );

        setCartItem(newSelection);
        setSizePopupOpen(true);
    };

    const sizeClickHandler = (sizeOptionId) => {
        const {categoryId, productId} = cartItem.product;

        // Create new selection with new size option (and current advanced options if any)
        const newSelection = storageData.generateCart(
            categoryId, 
            productId, 
            sizeOptionId,
            cartItem.advancedOptions ? cartItem.advancedOptions : null,
        );

        setCartItem(newSelection);
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
                    categoryProducts.map(
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
                (cartItem?.product?.productId) &&
                <Popup 
                key={1} 
                price={cartItem.totalAmount}
                isOpen={sizePopupOpen} 
                closeCb={closeSizePopup} 
                nextCb={clickHandler}
                >
                    <OptionSize 
                    sizeClickCb={sizeClickHandler} 
                    advClickCb={openAdvancedPopup} 
                    productName={selectedProduct.name} 
                    productImg={selectedProduct.img} 
                    productOptions={selectedProduct.sizes}
                    />
                </Popup>
            }

            {
                (cartItem?.product?.productId) &&
                <Popup 
                    key={2} 
                    price={cartItem.totalAmount} 
                    isOpen={advancedPopupOpen} 
                    closeCb={closeAdvancedPopup} 
                    nextCb={clickHandler}
                    >
                        <OptionAdvanced 
                        optionsData={storageData.advOptions}
                        cartItem={cartItem}
                        setCartItem={setCartItem}
                        />
                </Popup>
            }
            
            
        </section>
    )
}