import React from 'react';
import styles from './Brewing.module.scss';
import { useAppContext } from '../../hooks/context/AppContext';

export const Brewing = (props) => {
    const { nextCb } = props;
    
    const { state: { storage, cart } } = useAppContext();
    
    // Change to some fetch function, to retrieve duration based on the product
    /**
     * Returns an array of pairs [textMessage, timeInSeconds]
     * @returns {[stageText: string, stageTimeSeconds: number][]}
     */
    const prepareBrewingPlan = () => {
        const { product: { categoryId, productId }, advancedOptions } = cart;
        const selectedProduct = storage.getProductByCategoryId(categoryId, productId);
        const productStages = selectedProduct.steps;
        
        const optionsStages = storage.advOptions.list.reduce(
            (syrupStages, {id, name, step}) => {
                
                const syrupsInCart = Object.entries(advancedOptions)
                .filter(([_, optionValue]) => optionValue > 0)
                .map(([optionId]) => optionId);

                const timePerServing = 3;
                
                // If option is selected -> add to brewing stage
                if(syrupsInCart.includes(`${id}`))
                    syrupStages.push([`Добавляем ${name}`, (advancedOptions[id]/step) * timePerServing])

                return syrupStages;
            },
            []
        );

        // Return combined stages
        return productStages.concat(optionsStages);
    }

    // Get brewing plan for the current selection
    const brewingPlan = React.useMemo(() => prepareBrewingPlan(), [storage, cart]);

    // Calculate total brewing duration
    const brewingDuration = brewingPlan.reduce((total, [_, stepSeconds]) => total += stepSeconds, 0);
    
    const [duration, setDuration] = React.useState(brewingDuration);
    const [status, setStatus] = React.useState(brewingPlan[0][0] || 'Приготовление напитка')
    
    const minutes = parseInt(duration / 60).toString().padStart(2, 0);
    const seconds = (duration % 60).toString().padStart(2, 0);

    // For each brewing stage -> display brewing stage message and move to the next stage
    function emulateBrewing (brewingPlan, displayCb) {
        // Timeout id
        let timeoutId;

        // Function that displays next message after this step time ends
        function displayPlanSteps(stepIndex = 0) {
            return setTimeout(
                () => {
                    // Display next message
                    displayCb(brewingPlan[stepIndex + 1][0])
                    console.log('Timeout Id - ', timeoutId);
                    // Call next step if needed
                    if(stepIndex < brewingPlan.length - 2)
                        timeoutId = displayPlanSteps(stepIndex + 1)
                },
                brewingPlan[stepIndex][1] * 1000
            ); 
        };

        timeoutId = displayPlanSteps();

        return timeoutId;
    }

    React.useEffect(
        () => {
            if(duration === 0 && nextCb) nextCb();
        },
        [duration, nextCb]
    )

    React.useEffect(
        () => {
            // Countdown the brewing timer each seconds
            const countdown = setInterval(() => {
                setDuration(
                    prev => {
                        if(prev > 1) 
                            return (prev - 1);

                        clearInterval(countdown);
                        return 0;
                    }
                )
            }, 1000);

            // const emu = emulateBrewing(setStatus);
            const emu = emulateBrewing(brewingPlan, setStatus);

            return () => {
                clearInterval(countdown);
                clearInterval(emu);
            }
        },
        []
    )

    return (
        <section className={styles['wrapper']}>

            <div className={styles['progress-group']} style={{'--timerDuration': `${brewingDuration}s`}}>
                <svg className={styles['progress__circle']} width={900} height={900} viewBox='0 0 900 900'>
                    <circle className={styles['circle__bg']} r={438} cx={900/2} cy={900/2} ></circle>
                    <circle className={styles['circle__fg']} r={438} cx={900/2} cy={900/2} 
                    ></circle>
                </svg>

                <div className={styles['progress__dot']}></div>

                <div className={styles['progress__display']}>
                    <span className={styles['timer']}>{minutes}:{seconds}</span>
                    <span className={styles['status']}>{status}</span>
                </div>
            </div>

        </section>
    )
}