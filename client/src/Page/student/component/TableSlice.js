import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudent, getClass } from '../../../API/api';
import { fetchApiData } from '../../../Helpers/apiHelpers';

const initState = {
    student: [],
    classes: [],
    classcurrent: '',
};
const TableClice = createSlice({
    name: 'TableSlice',
    initialState: initState,
    reducers: {
        getNameClasses: (state, action) => {
            state.classcurrent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApiStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload.student;
            })
            .addCase(getApiStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getApiClasses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApiClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.classes = action.payload.classes;
            })
            .addCase(getApiClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default TableClice;

export const getApiStudent = createAsyncThunk(
    'TableSlice/getApiStudent',
    async (data) => fetchApiData(getStudent, data),
);
export const getApiClasses = createAsyncThunk(
    'TableSlice/getApiClasses',
    async () => fetchApiData(getClass),
);
