import React from 'react';
import styles from './OptionAdvanced.module.scss';
import { HiPlus, HiMinus } from "react-icons/hi2";

export const OptionAdvanced = () => {

    const advancedOptions = [
        {
            id: 1,
            name: 'Ванильный сироп',
        },
        {
            id: 2,
            name: 'Мятный сироп',
        },
        {
            id: 3,
            name: 'Карамельный сироп',
        },
        {
            id: 4,
            name: 'Шоколадный сироп',
        },
    ];

    const OPTION_MIN = 0;
    const OPTION_MAX = 99;
    const OPTION_STEP = 5;

    const defaultAdvancedOptions = advancedOptions.reduce(
        (reducedObj, {id}) => {
            if(!(id in reducedObj))
                reducedObj[id] = 0;
            return reducedObj;
        },
        {}
    )
        
    const [selectedAdvanced, setSelectedAvanced] = React.useState(defaultAdvancedOptions);
    
    const incrementOption = (optionId) => {
        setSelectedAvanced(
            prev => ({...prev, [optionId]: Math.min(OPTION_MAX, prev[optionId] + OPTION_STEP) })
        )
    };

    const decrementOption = (optionId) => {
        setSelectedAvanced(
            prev => ({...prev, [optionId]: Math.max(OPTION_MIN, prev[optionId] - OPTION_STEP) })
        )
    };

    return (
        <div className={styles['wrapper']}>
            {
                advancedOptions.map(
                    ({id, name }) => {
                        return (
                            <div key={id + name} className={styles['option-item']}>
                                <p className={styles['option-name']}>
                                    { name }
                                </p>
                                <div className={styles['option-counter']}>
                                    <button 
                                    disabled={ selectedAdvanced[id] <= OPTION_MIN }
                                    onClick={() => decrementOption(id)}
                                    >
                                        <HiMinus/>
                                    </button>

                                    <span>{ selectedAdvanced[id] } гр.</span>

                                    <button
                                    disabled={ selectedAdvanced[id] >= OPTION_MAX }
                                    onClick={() => incrementOption(id)}
                                    >
                                        <HiPlus/>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                )
            }
            
        </div>
    )
}