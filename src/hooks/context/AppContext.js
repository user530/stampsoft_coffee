import React from 'react';
import { Emulator } from '../../common/classes';
import { storage } from '../../data/data';
import { combineReducers, emulatorReducer, storageReducer, cartReducer, historyReducer } from '../reducers';

const initialState = {
    emulator: new Emulator(),
    storage: storage,
    cart: null,
    history: [],
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const rootReducer = combineReducers({
        emulator: emulatorReducer,
        storage: storageReducer,        
        cart: cartReducer,
        history: historyReducer,
    });

    const [state, dispatch] = React.useReducer(rootReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);