export function emulatorReducer(state, action) {
    switch(action.type) {
        case "START_CASH_IN":
            console.log('START CASHIN ACTION FIRED');
            console.log(action.payload);

            state.emulator.StartCashin(action.payload.cb);

            return { ...state };

        case "STOP_CASH_IN": 
            console.log('STOP CASHIN ACTION FIRED');
            console.log(action.payload);
            state.emulator.StopCashin(action.payload.cb)
            return { ...state };

        case "EMIT_CASH_IN":
            console.log('EMIT CASHIN ACTION FIRED');
            console.log(action.payload);
            state.emulator.EmitCashin(action.payload.amount)
            return { ...state };

        default:
            return { ...state };
    }   
}