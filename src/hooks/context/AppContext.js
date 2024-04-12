import React from 'react';
import { Emulator } from '../../common/classes';
import { storage } from '../../data/data';
import { combineReducers, emulatorReducer, storageReducer, cartReducer } from '../reducers';

const initialState = {
    emulator: new Emulator(),
    storage: storage,
    cart: null,
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    
    const rootReducer = combineReducers({
        emulator: emulatorReducer,
        storage: storageReducer,        
        cart: cartReducer,
    });

    const [state, dispatch] = React.useReducer(rootReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => React.useContext(AppContext);