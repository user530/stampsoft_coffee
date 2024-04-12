export function combineReducers(reducers) {
    return function (state={}, action) {
        const newState = {};
        
        // Iterate over every reducer in the reducers object and call reducer function with reducer state slice
        for(const key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        
        return newState;
    }
}