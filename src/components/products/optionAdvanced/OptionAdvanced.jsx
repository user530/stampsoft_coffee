import React from 'react';
import styles from './OptionAdvanced.module.scss';
import { HiPlus, HiMinus } from "react-icons/hi2";

export const OptionAdvanced = (props) => {
    const { optionsData, cartItem, setCartItem } = props;

    // Cart item options slice
    const { advancedOptions } = cartItem;
    
    console.log(props.cartItem);
    console.log(optionsData);

    // Advanced options meta(storage) data
    const optionsMetadata = optionsData.list || [];
    
    /**
     * Create new selection from the current one with updated option
     * @param {number} optionId Advanced option to change value
     * @param {boolean} plus If true - adds a step to the option, minus else 
     * @returns New selection with one option update, or null if option is not found
     */
    const updatedSelection = (optionId, plus = true) => {
        const singleOptionMetadata = optionsMetadata.find(option => option.id === optionId);

        if(!optionId || !singleOptionMetadata) return null;
        
        const updatedAdvOptions = {
            ...cartItem.advancedOptions, 
            [optionId]: Math.min(
                singleOptionMetadata.quantity, 
                advancedOptions[optionId] + (plus ? 1 : -1) * singleOptionMetadata.step
            )
        };

        const oldAdvAmount = optionsData.calculateAdvOptions(cartItem.advancedOptions);
        const newAdvAmount = optionsData.calculateAdvOptions(updatedAdvOptions); 
        
        return (
            {
                ...cartItem, 
                advancedOptions: updatedAdvOptions,
                totalAmount: cartItem.totalAmount  + (newAdvAmount - oldAdvAmount),
            }
        );
    }

    const incrementOption = (optionId) => {
        const newSelection = updatedSelection(optionId);
        
        if(!newSelection) return;

        setCartItem(newSelection);
    };

    const decrementOption = (optionId) => {
        const newSelection = updatedSelection(optionId, false);

        if(!newSelection) return;

        setCartItem(newSelection);
    };

    return (
        <div className={styles['wrapper']}>
            {
                optionsMetadata.map(
                    ({id, name, quantity }) => {
                        return (
                            <div key={id + name} className={styles['option-item']}>
                                <p className={styles['option-name']}>
                                    { name }
                                </p>
                                <div className={styles['option-counter']}>
                                    <button 
                                    disabled={ advancedOptions[id] <= 0 }
                                    onClick={() => decrementOption(id)}
                                    >
                                        <HiMinus/>
                                    </button>

                                    <span>{ advancedOptions[id] } гр.</span>

                                    <button
                                    disabled={ advancedOptions[id] >= quantity }
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