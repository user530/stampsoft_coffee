import styles from './ProductItem.module.scss';

export const ProductItem = (props) => {
    const { name, img, starterPrice, clickHandler } = props;
    
    return (
        <div className={styles['product-card']} onClick={clickHandler}>
            <div className={styles['product-card__img-wrapper']}>
                <img src={img} alt={name} />
            </div>
            <h5>{name}</h5>
            <p>от <span>{starterPrice}&#8381;</span></p>
        </div>
    )
}