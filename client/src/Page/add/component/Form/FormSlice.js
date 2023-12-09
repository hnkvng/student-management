import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createStudent, setStudentEdit } from '../../../../API/api';
import props from '../../../../log/props';
import { fetchApiData } from '../../../../Helpers/apiHelpers';

const checkEmpty = (data) => /^$/.test(data);
const checkAll = (data) => /[!@#^$%^&*()_+={}[\]:;<>,.?~"'`\\/-]/.test(data);
const checkNum = (data) => /[0-9]/.test(data);
const checkChar = (data) => /[a-zA-Z]/.test(data);
const checkForNum = (data) => /[^.\w]/.test(data);
const checkForClass = (data) => /[^-_\w]/.test(data);

const fieldStudent = [
    'MSSV',
    'Name',
    'Birth',
    'Faculty',
    'QT',
    'GK',
    'CK',
    'Class',
];
const createOject = (value) =>
    Object.fromEntries(fieldStudent.map((name) => [name, value]));
const initState = {
    student: createOject(''),
    status: createOject(false),
    info: createOject(''),
    style: createOject(null),
    nameButton: 'Thêm',
    button: {
        submit: true,
        clear: true,
    },
    log: '',
    add: false,
    edit: false,
};

const testCase = (state, name, data) => {
    switch (name) {
        case 'MSSV':
            break;
        case 'Name':
            state.status[name] = !checkNum(data);
            break;
        case 'Birth':
            state.status[name] =
                !(new Date(data).getFullYear() > new Date().getFullYear()) &&
                !(new Date(data).getFullYear() < 1000);
            break;
        case 'Faculty':
            state.status[name] = !checkNum(data);
            break;
        case 'QT':
        case 'GK':
        case 'CK':
            state.status[name] =
                !(data < 0 || data > 10) &&
                !(data[0] === '.' || data[2] === '.' || data[3] === '.') &&
                !checkChar(data) &&
                !checkForNum(data);
            break;
        case 'Class':
            state.status[name] = !checkForClass(data);
            break;
        default:
            throw new Error('Name is invalid');
    }
};

const checkData = (state, action) => {
    const { value, name } = action.payload;
    state.status[name] = !checkEmpty(value);
    if (checkEmpty(value)) return;
    if (!['Class', 'QT', 'GK', 'CK', 'Birth'].includes(name)) {
        state.status[name] = !checkAll(value);
        if (checkAll(value)) return;
    }
    testCase(state, name, value);
};

const addInfoError = (state) => {
    Object.entries(state.status).forEach(([item, value]) => {
        if (!value) {
            state.info[item] = 'thông tin không hợp lệ hoặc thiếu';
            state.style[item] = { border: '1px solid red' };
        } else {
            state.style[item] = { border: '1px solid green' };
        }
    });
};

const deleteInfoError = (state, action) => {
    Object.entries(state.status).forEach(([item]) => {
        if (item === action.payload.name) {
            state.info[item] = null;
            state.style[item] = null;
        }
    });
};

const dataCheckEmpty = (datas) =>
    Object.values(datas).some((value) => value !== '');

const FormSlice = createSlice({
    name: 'FormSlice',
    initialState: initState,
    reducers: {
        resetinitialState: () => initState,
        enterStudent: (state, action) => {
            state.student = action.payload;
            if (dataCheckEmpty(state.student)) {
                state.button.clear = false;
                state.button.submit = false;
            } else {
                state.button.clear = true;
                state.button.submit = true;
            }
        },
        clearStudent: (state, action) => {
            state.student = { ...state.student, ...action.payload.form };
            console.log({ ...state.student, ...action.payload.form });
            state.status = createOject(false);
            state.log = { ...props.clear, idTimeout: action.payload.id };
        },
        setInfo: (state) => {
            if (state.log.idTimeout !== undefined)
                clearTimeout(state.log.idTimeout);
            state.log = '';
        },
        setNameButton: (state, action) => {
            state.nameButton = action.payload;
        },
        setSatus: (state) => {
            state.status = createOject(true);
        },
        deleteInfoError: deleteInfoError,
        addInfoError: addInfoError,
        checkData: checkData,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.add = true;
                state.button.submit = false;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.add = false;
                state.log = { ...props.success, des: action.payload.message };
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.add = false;
                state.log = { ...props.error, des: action.payload.message };
            })
            .addCase(editStudent.pending, (state) => {
                state.loading = true;
                state.button.submit = false;
                state.edit = true;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.edit = false;
                state.log = { ...props.edit, des: action.payload.message };
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.edit = false;
                state.log = { ...props.error, des: action.payload.message };
            });
    },
});

export default FormSlice;

export const addStudent = createAsyncThunk(
    'FormSlice/addStudent',
    async (data, Thunk) => fetchApiData(createStudent, data, Thunk),
);
export const editStudent = createAsyncThunk(
    'FormSlice/getApiEdit',
    async (data, Thunk) => fetchApiData(setStudentEdit, data, Thunk),
);
