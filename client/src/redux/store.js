import { configureStore } from '@reduxjs/toolkit';
import FormSlice from '../Page/add/component/Form/FormSlice';

const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
    },
});

export default store;
