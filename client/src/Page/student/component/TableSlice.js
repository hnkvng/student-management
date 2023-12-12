import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getStudent,
    getClass,
    getStudentEdit,
    removeStudent,
    removeClass,
    updateClass,
} from '../../../API/api';
import { fetchApiData } from '../../../Helpers/apiHelpers';
import props from '../../../log/props';
const initState = {
    student: [],
    classes: [],
    class: {
        classesId: '',
        classesName: '',
    },
    iconCurrent: {},
    optionsCurrent: '',
    studentEdit: {},
    delete: false,
    editClass: false,
    targetDelete: {
        name: '',
        show: false,
        des: '',
        method: '',
        idStudent: '',
        idClass: '',
    },
    nameClass: '',
    openClass: false,
    log: '',
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
            state.optionsCurrent = '';
        },
        setOptionCurrent: (state, action) => {
            state.optionsCurrent = action.payload;
        },
        getNameClasses: (state, action) => {
            state.class.classesId = action.payload;
        },
        appearIcon: (state, action) => {
            state.iconCurrent = action.payload;
        },
        setTargetDelete: (state, action) => {
            state.targetDelete = action.payload;
        },
        setLogNull: (state) => {
            state.log = '';
        },
        setOpenClass: (state, action) => {
            state.openClass = action.payload;
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
            //
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
            })
            //
            .addCase(getApiStudentEdit.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApiStudentEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.studentEdit = action.payload.student;
            })
            .addCase(getApiStudentEdit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
                state.delete = false;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.delete = true;
                state.log = { ...props.delete, des: action.payload.message };
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.delete = false;
                state.log = { ...props.delete, des: action.payload.message };
            })
            .addCase(deleteClass.pending, (state) => {
                state.loading = true;
                state.delete = false;
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.loading = false;
                state.delete = true;
                state.class = {
                    classesId: '',
                    classesName: '',
                };
                state.iconCurrent = {};
                state.optionsCurrent = '';
                state.log = { ...props.delete, des: action.payload.message };
            })
            .addCase(deleteClass.rejected, (state, action) => {
                state.loading = false;
                state.delete = false;
                state.log = { ...props.error, des: action.payload.message };
            })
            .addCase(editClass.pending, (state) => {
                state.loading = true;
                state.editClass = false;
            })
            .addCase(editClass.fulfilled, (state, action) => {
                state.loading = false;
                state.editClass = true;
                state.log = { ...props.edit, des: action.payload.message };
            })
            .addCase(editClass.rejected, (state, action) => {
                state.loading = false;
                state.editClass = false;
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
export const getApiStudentEdit = createAsyncThunk(
    'TableSlice/getApiStudentEdit',
    async (data, Thunk) => fetchApiData(getStudentEdit, data, Thunk),
);
export const deleteStudent = createAsyncThunk(
    'TableSlice/deleteStudent',
    async (data, Thunk) => fetchApiData(removeStudent, data, Thunk),
);
export const deleteClass = createAsyncThunk(
    'TableSlice/deleteClass',
    async (data, Thunk) => fetchApiData(removeClass, data, Thunk),
);
export const editClass = createAsyncThunk(
    'TableSlice/EditClasst',
    async (data, Thunk) => fetchApiData(updateClass, data, Thunk),
);
