import styles from './ProductItem.module.scss';

export const ProductItem = (props) => {
    const { name, img, starterPrice, quantity, clickHandler } = props;
    
    return (
        <div className={styles['product-card']} onClick={clickHandler}>
            <div className={styles['product-card__img-wrapper']}>
                <img src={img} alt={name} />
            </div>
            <h5>{name}</h5>
            <span style={{position: 'absolute', top: 20, left: 20, width: 'fit-content' }}>Остаток: {quantity * 200} мл.</span>
            <p>от <span>{starterPrice}&#8381;</span></p>
        </div>
    )
}