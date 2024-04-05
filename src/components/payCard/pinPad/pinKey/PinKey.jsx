import styles from './PinKey.module.scss';

export const PinKey = (props) => {
    const { children, clickCb, isActive } = props;

    return (
        <button 
        className={styles['pin-key']} 
        onClick={ clickCb }
        disabled={ !isActive }
        >
            { children }
        </button>
    )
}