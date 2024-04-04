import React from 'react';

export const useTimeout = (timeoutCb) => {
    // Timeout to return back to the Promo screen if user is idle for a time
    const TIMEOUT = 5000;
    const timeoutRef = React.useRef(null);

    const resetTimeout = () => {
        if(timeoutRef.current)
            clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(timeoutCb, TIMEOUT);
    }

    const handleUserActivity = () => resetTimeout();

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
                
                if(timeoutRef.current)
                    clearTimeout(timeoutRef);
                
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