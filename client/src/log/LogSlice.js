import { createSlice } from '@reduxjs/toolkit';

const initState = {
    log: '',
    idTimeout: '',
};

const LogSlice = createSlice({
    name: 'LogSlice',
    initialState: initState,
    reducers: {
        setLog: (state, action) => {
            state.log = action.payload;
        },
        setIdTime: (state, action) => {
            state.idTimeout = action.payload;
        },
        setInfo: (state) => {
            if (state.idTimeout !== '') clearTimeout(state.idTimeout);
        },
        setLogNull: (state) => {
            state.log = '';
        },
    },
});

export default LogSlice;
