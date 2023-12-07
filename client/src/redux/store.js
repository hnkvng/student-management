import { configureStore } from '@reduxjs/toolkit';
import FormSlice from '../Page/add/component/Form/FormSlice';
import TableClice from '../Page/student/component/TableSlice';

const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
        table: TableClice.reducer,
    },
});
export default store;
