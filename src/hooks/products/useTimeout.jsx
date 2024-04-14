import React from 'react';

/**
 * Custom hook to call a specified callback if user doesn't interact with the component in specified time
 * @param { Function } timeoutCb Callback that will be fired if specified time user doesn't do anything
 * @param { number } timeoutSec Time in seconds to wait before firing the callback
 */
export const useTimeout = (timeoutCb, timeoutSec=10) => {
    // Timeout to return back to the Promo screen if user is idle for a time
    const timeoutRef = React.useRef(null);

    const resetTimeout = () => {
        if(timeoutRef.current)
            clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(timeoutCb, timeoutSec * 1000);
    }

    const handleUserActivity = () => { resetTimeout() };

    React.useEffect(
        () => {
            resetTimeout();

            // Set up listeners
            document.addEventListener('mousemove', handleUserActivity);
            document.addEventListener('mousedown', handleUserActivity);
            document.addEventListener('keydown', handleUserActivity);
            document.addEventListener('touchstart', handleUserActivity);
            document.addEventListener('scroll', handleUserActivity);

            return () => {
                if(timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                
                document.removeEventListener('mousemove', handleUserActivity);
                document.removeEventListener('mousedown', handleUserActivity);
                document.removeEventListener('keydown', handleUserActivity);
                document.removeEventListener('touchstart', handleUserActivity);
                document.removeEventListener('scroll', handleUserActivity);
            }
        },
        []
    )
}