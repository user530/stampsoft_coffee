import React from 'react'
import styles from './PinPad.module.scss'
import { FaAngleLeft } from 'react-icons/fa6'
import { TfiAngleDoubleLeft } from "react-icons/tfi";
import { PinKey } from './pinKey/PinKey';

export const PinPad = (props) => {
    const { isActive, hidePinpad, closeCb, sumbitCb } = props;

    const [pincode, setPincode] = React.useState('');
    const [awaitingResult, setAwaitingResult] = React.useState(false);
    
    const addNumber = React.useCallback(
        (number) => {
            if(isNaN(Number(number))) return;
            setPincode(prev => prev.length < 4 ? prev + number : prev );
        },
        []
    ); 

    const removeNumber = React.useCallback(
        () => {
            setPincode(prev => prev.length > 0 ? prev.slice(0, -1) : prev );
        },
        []
    );

    const closeBtnHandler = () => {
        setPincode('');
        closeCb();
        setAwaitingResult(false);
    };

    const submitBtnHandler = () => {
        sumbitCb(pincode);
        setPincode('');
        setAwaitingResult(true);
        hidePinpad();
    }

    return (
        <div className={`${styles['wrapper']} ${isActive ? styles['active'] : ''}`}>
            <button 
                className={styles['button-back']}
                onClick={closeBtnHandler}
                disabled={awaitingResult}
            >
                <FaAngleLeft/>
            </button>

            <div className={styles['content']}>
                <h3 className={styles['pin-title']}>Введите Pin-код</h3>

                <div className={styles['pin-display']}>
                    <span>{pincode[0] || '_'}</span>
                    <span>{pincode[1] || '_'}</span>
                    <span>{pincode[2] || '_'}</span>
                    <span>{pincode[3] || '_'}</span>
                </div>

                <div className={styles['pin-keypad']}>
                    <>
                        {
                            [1,2,3,4,5,6,7,8,9,0].map(
                                value => (
                                <PinKey 
                                    key={value} 
                                    clickCb={() => addNumber(value)}
                                    isActive={ pincode.length < 4 }
                                > 
                                    <span>{ value }</span> 
                                </PinKey>)
                            )
                        }
                        <PinKey clickCb={ removeNumber } isActive={ pincode.length > 0 }> 
                            <TfiAngleDoubleLeft/>
                        </PinKey>
                    </>
                </div>
            </div>

            <button 
                className={styles['button-submit']} 
                disabled={ pincode.length !== 4 || awaitingResult }
                onClick={ submitBtnHandler }
            >
                Отправить
            </button>
        </div>
    )
}