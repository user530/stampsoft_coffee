import React from 'react';
import styles from './Products.module.scss';
import { useTimeout } from '../../hooks/products/useTimeout';

export const Products = (props) => {
    const { next, prev, setProduct } = props;

    const onTimeout = () => { setProduct(null); prev() };

    useTimeout(onTimeout);

    const nextCard = () => next('card');
    const nextCash = () => next('cash');
    
    return (
        <section className={styles['wrapper']}>
            <h1>PRODUCTS</h1>
            <button onClick={nextCard}>Pay Card</button>
            <button onClick={nextCash}>Pay Cash</button>
            <button onClick={() => setProduct(42)}>Product</button>
        </section>
    )
}