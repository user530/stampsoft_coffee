import React from 'react';
import { Emulator } from '../../common/classes';
import { emulatorReducer } from '../../hooks/reducers/emulator';

const initialState = {
    emulator: new Emulator(),
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