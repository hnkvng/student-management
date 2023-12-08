import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudent, getClass, getStudentEdit } from '../../../API/api';
import { fetchApiData } from '../../../Helpers/apiHelpers';

const initState = {
    student: [],
    classes: [],
    class: {
        classesId: '',
        classesName: '',
    },
    iconCurrent: {},
};
const TableSlice = createSlice({
    name: 'TableSlice',
    initialState: initState,
    reducers: {
        resetinitialState: () => initState,
        resetIcon: (state) => {
            state.iconCurrent = {
                classesId: '',
                classesName: '',
            };
        },
        getNameClasses: (state, action) => {
            state.class.classesId = action.payload;
        },
        appearIcon: (state, action) => {
            state.iconCurrent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApiStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApiStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload.Student;
                state.class.classesName = action.payload.Classes;
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
export default TableSlice;

export const getApiStudent = createAsyncThunk(
    'TableSlice/getApiStudent',
    async (data, Thunk) => fetchApiData(getStudent, data, Thunk),
);
export const getApiClasses = createAsyncThunk(
    'TableSlice/getApiClasses',
    async (_, Thunk) => fetchApiData(getClass, Thunk),
);
export const getApiEdit = createAsyncThunk(
    'TableSlice/getApiEdit',
    async (data, Thunk) => fetchApiData(getStudentEdit, data, Thunk),
);
