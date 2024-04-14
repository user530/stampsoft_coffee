import styles from './Popup.module.scss';
import { VscChromeClose } from "react-icons/vsc";

export const Popup = (props) => {
    const { children, price, isOpen, closeCb, nextCb } = props;

    return (
        <section 
        className={`${styles['overlay']} ${isOpen ? styles['active']: ''}`}
        >
            <div className={styles['popup__bg']}></div>
            <div className={styles['popup']}>
                <button 
                className={styles['popup__close']}
                onClick={closeCb}
                >
                    <VscChromeClose className={styles['popup__close-icon']}/>
                </button>

                { children }

                <button 
                className={styles['popup__next']}
                onClick={nextCb}
                >
                    <p>Оплатить</p>
                    <p className={styles['accent']}>{ price ?? ''}&#8381;</p>
                </button>
            </div>
        </section>
    )
}