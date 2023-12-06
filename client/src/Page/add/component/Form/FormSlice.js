import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createStudent } from '../../../../API/api';
import props from '../../../../log/props';

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
                new Date(data).getFullYear() > new Date().getFullYear() ||
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
    for (let item in state.status) {
        if (!state.status[item]) {
            state.info[item] = (
                <small style={{ color: 'red' }}>
                    thông tin sai hoặc thiếu!
                </small>
            );
            state.style[item] = { border: '1px solid red' };
        } else {
            state.style[item] = { border: '1px solid green' };
        }
    }
};

const deleteInfoError = (state, action) => {
    for (let item in state.status) {
        if (item === action.payload.name) {
            state.info[item] = null;
            state.style[item] = null;
        }
    }
};

const dataCheckEmpty = (datas) => {
    const value = Object.values(datas);
    return value.some((va) => va !== '');
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
            MSSV: null,
            Name: null,
            Birth: null,
            Faculty: null,
            QT: null,
            GK: null,
            CK: null,
            Class: null,
        },
        style: {
            MSSV: null,
            Name: null,
            Birth: null,
            Faculty: null,
            QT: null,
            GK: null,
            CK: null,
            Class: null,
        },
        button: {
            submit: true,
            clear: true,
        },
        log: [],
    },
    reducers: {
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
            state.student = action.payload.form;
            state.log.push({ id: action.payload.id, info: props.clear });
            state.button.clear = true;
        },
        popLog: (state) => {
            state.log.pop(state.log[0]);
        },
        deleteInfoError: deleteInfoError,
        addInfoError: addInfoError,
        checkData: checkData,
    },
    extraReducers: (builder) => {
        builder.addCase(addStudent.pending, (state, action) => {
            state.loading = true;
            state.button.submit = false;
        });
        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.loading = false;
            state.button.submit = true;
            state.log.push({ id: 1, info: props.clear });
        });
        builder.addCase(addStudent.rejected, (state, action) => {
            state.loading = false;
            console.log('Error');
        });
    },
});

export default FormSlice;

export const addStudent = createAsyncThunk(
    'FormSlice/addStudent',
    async (payload) => {
        try {
            const response = await createStudent(payload);
            return response.data;
        } catch (error) {
            return error;
        }
    },
);
