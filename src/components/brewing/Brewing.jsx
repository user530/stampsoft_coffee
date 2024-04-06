import React from 'react';
import styles from './Brewing.module.scss';

export const Brewing = (props) => {
    const { nextCb } = props;
    
    // Change to some fetch function, to retrieve duration based on the product
    const brewingDuration = (() => 137)();
    const [duration, setDuration] = React.useState(brewingDuration);
    const [status, setStatus] = React.useState('Приготовление напитка')
    
    const minutes = parseInt(duration / 60).toString().padStart(2, 0);
    const seconds = (duration % 60).toString().padStart(2, 0);

    function emulateBrewing (displayCb) {
        return setInterval(
            ()=> {
                const rnd = Math.random();
                switch(true){
                    case(rnd < 0.2):
                        return displayCb('Делаю чего-то');
                    case(rnd < 0.4):
                        return displayCb('Делаю чего-то ещё');
                    case(rnd < 0.6):
                        return displayCb('Очень важное действие');
                    case(rnd < 0.8):
                        return displayCb('Уже почти готово');
                    default:
                        return displayCb('Осталось совсем чуть-чуть');           
                }
            }, 3000
        )
    }

    React.useEffect(
        () => {
            if(duration === 0) nextCb();
        },
        [duration, nextCb]
    )

    React.useEffect(
        () => {
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

            const emu = emulateBrewing(setStatus);

            return () => {
                clearInterval(countdown);
                clearInterval(emu);
            }
        },
        []
    )
    
    return (
        <section className={styles['wrapper']}>

            <div className={styles['circle']} 
            style={{'--timerDuration': `${brewingDuration}s`}}
            >
                <span className={styles['timer']}>{minutes}:{seconds}</span>
                <span className={styles['status']}>{status}</span>
            </div>

        </section>
    )
}