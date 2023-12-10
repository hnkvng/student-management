import { configureStore } from '@reduxjs/toolkit';
import FormSlice from '../Page/add/component/Form/FormSlice';
import TableClice from '../Page/student/component/TableSlice';
import LogSlice from '../log/LogSlice';
const store = configureStore({
    reducer: {
        log: LogSlice.reducer,
        form: FormSlice.reducer,
        table: TableClice.reducer,
    },
});
export default store;
