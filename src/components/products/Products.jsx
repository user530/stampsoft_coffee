import React from 'react';
import styles from './Products.module.scss';

export const Products = (props) => {
    const { next, prev, setProduct } = props;

    // Timeout to return back to the Promo screen if user is idle for a time
    const TIMEOUT = 5000;
    const timeoutRef = React.useRef(null);
    
    const onTimeout = () => { setProduct(null); prev() };
    
    const nextCard = () => next('card');
    const nextCash = () => next('cash');

    const resetTimeout = () => {
        if(timeoutRef.current)
            clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(onTimeout, TIMEOUT);
    }

    const handleUserActivity = () => resetTimeout();

    React.useEffect(
        () => {
            resetTimeout();

            // Set up listeners
            document.addEventListener('mousemove', handleUserActivity);
            document.addEventListener('mousedown', handleUserActivity);
            document.addEventListener('keydown', handleUserActivity);
            document.addEventListener('touchstart', handleUserActivity);
            document.addEventListener('scroll', handleUserActivity);

            return () => {
                
                if(timeoutRef.current)
                    clearTimeout(timeoutRef);
                
                document.removeEventListener('mousemove', handleUserActivity);
                document.removeEventListener('mousedown', handleUserActivity);
                document.removeEventListener('keydown', handleUserActivity);
                document.removeEventListener('touchstart', handleUserActivity);
                document.removeEventListener('scroll', handleUserActivity);
            }
        },
        []
    )
    
    return (
        <section className={styles['wrapper']}>
            <h1>PRODUCTS</h1>
            <button onClick={nextCard}>Pay Card</button>
            <button onClick={nextCash}>Pay Cash</button>
            <button onClick={() => setProduct(42)}>Product</button>
        </section>
    )
}