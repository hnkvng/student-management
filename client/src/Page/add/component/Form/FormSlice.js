import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const checkEmpty = (data) => /^$/.test(data);
const checkAll = (data) => /[!@#^$%^&*()_+={}[\]:;<>,.?~"'`\\/-]/.test(data);
const checkNum = (data) => /[0-9]/.test(data);
const checkChar = (data) => /[a-zA-Z]/.test(data);
const checkForNum = (data) => /[^.\w]/.test(data);
const checkForClass = (data) => /[^-_\w]/.test(data);

const testCase = (state, name, data) => {
    switch (name) {
        case 'MSSV':
            break;
        case 'Name':
            state.status[name] = !checkNum(data);
            break;
        case 'Birth':
            state.status[name] = !(
                new Date(data).getFullYear() > new Date().getFullYear() &&
                new Date(data).getFullYear() < 1000
            );
            break;
        case 'Faculty':
            state.status[name] = !checkNum(data);
            break;
        case 'QT':
        case 'GK':
        case 'CK':
            state.status[name] =
                !(data < 0 || data > 10) &&
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

const FormSlice = createSlice({
    name: 'FormSlice',
    initialState: {
        student: {
            MSSV: '',
            Name: '',
            Birth: '',
            Faculty: '',
            QT: '',
            GK: '',
            CK: '',
            Class: '',
        },
        status: {
            MSSV: false,
            Name: false,
            Birth: false,
            Faculty: false,
            QT: false,
            GK: false,
            CK: false,
            Class: false,
        },
        info: {
            MSSV: '',
            Name: '',
            Birth: '',
            Faculty: '',
            QT: '',
            GK: '',
            CK: '',
            Class: '',
        },
    },
    reducers: {
        enterStudent: (state, action) => {
            state.student = action.payload;
        },
        checkData: checkData,
    },
});

export default FormSlice;
