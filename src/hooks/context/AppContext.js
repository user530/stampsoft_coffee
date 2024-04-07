import React from 'react';
import { Emulator } from '../../common/classes';

const initialState = {
    emulator: new Emulator(),
}

const AppContext = React.createContext(initialState);

export const AppProvider = ({ children }) => {
    const value = {
        emulator: new Emulator(),
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);