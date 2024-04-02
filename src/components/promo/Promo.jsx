import styles from './Promo.module.scss';
import { bean1, bean2, bean3, bean4, bean5, cup } from '../../static';

export const Promo = (props) => {
    const { headingTxt, btnText, next } = props;

    const clickHandler = () => {
        console.log('Clicked promo!');
        next();
    }
    
    return (
        <section onClick={clickHandler} className={styles['wrapper']}>
            <div className={styles['heading']}>
                <h1 className={styles['h1']}>{headingTxt}</h1>
            </div>

            <div className={styles['white-cirlce']}>
                <h4 className={styles['h4']}>{btnText}</h4>
            </div>

            <img className={styles['bean1']} src={ bean1 } alt="cofee-bean-1" width={61} height={47}/>
            <img className={styles['bean2']} src={ bean2 } alt="cofee-bean-2" width={123} height={162}/>
            <img className={styles['bean3']} src={ bean3 } alt="cofee-bean-3" width={118} height={89}/>
            <img className={styles['bean4']} src={ bean4 } alt="cofee-bean-4" width={123} height={107}/>
            <img className={styles['bean5']} src={ bean4 } alt="cofee-bean-5" width={123} height={107}/>
            <img className={styles['bean6']} src={ bean5 } alt="cofee-bean-6" width={260} height={235}/>

            <img className={styles['cup1']} src={ cup } alt="cup-1" width={1092} height={1102}/>
            <img className={styles['cup2']} src={ cup } alt="cup-2" width={925} height={933}/>
            
        </section>
    )
}