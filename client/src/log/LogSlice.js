import { createSlice } from '@reduxjs/toolkit';

const initState = {
    log: [],
};

const LogSlice = createSlice({
    name: 'LogSlice',
    initialState: initState,
    reducers: {
        setLog: (state, action) => {
            if (action.payload.target !== undefined) {
                state.log.push({
                    target: action.payload.target,
                    timeId: action.payload.timeId,
                });
            }
        },
        desploy: (state) => {
            clearTimeout(state.log[0].timeId);
            state.log.shift();
        },
        desployback: (state) => {
            clearTimeout(state.log[state.log.length - 1].timeId);
            state.log.pop();
        },
        clearAll: (state) => {
            if (state.log.length > 0) {
                for (let i = 0; i < state.log.length; i++) {
                    clearTimeout(state.log[i].timeId);
                }
                state.log = [];
            }
        },
    },
});

export default LogSlice;
