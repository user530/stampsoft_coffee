import React from 'react';
import styles from './FullscreenBlock.module.scss';

export const FullscreenBlock = (props) => {
    const { children, bgColor } = props;

    return (
        <section className={styles['wrapper']} style={{'--bgc': bgColor ?? 'white'}}>
            { children }
        </section>
    )
}