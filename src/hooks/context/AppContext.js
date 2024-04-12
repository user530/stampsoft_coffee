import React from 'react';
import { Emulator } from '../../common/classes';
import { emulatorReducer } from '../../hooks/reducers/emulator';
import { storage } from '../../data/data';

const initialState = {
    emulator: new Emulator(),
    storage: storage,
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(emulatorReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);