/**
 * 
 * @param {Order[]} state Array of orders representing the purchase history 
 * @param {{type: string, payload: unknown}} action Action object holding the command and the additional data 
 * @returns 
 */
export const historyReducer = (state, action) => {
    switch(action.type) {
        case 'SAVE_ORDER_INFO':
            return [ ...state, action.payload ];
        
        default:
            return [...state];
    }
}