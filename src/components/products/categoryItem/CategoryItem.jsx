import styles from './CategoryItem.module.scss';

export const CategoryItem = (props) => {
    const { name, img, isSelected, clickHandler } = props;

    return (
        <div 
            onClick={clickHandler}
            className={`${styles['category-item']} ${isSelected ? styles['active'] : ''}`}
            >
                <div className={styles['category-item__img']}>
                    <img src={img} alt={name} width={256} height={256}/>
                </div>

                <p className={styles['text-small']}>{name}</p>

                <span></span>
            </div>
    )
}