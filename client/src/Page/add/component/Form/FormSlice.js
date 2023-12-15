import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createStudent, updateStudent } from '../../../../API/api';
import props from '../../../../log/props';
import { fetchApiData } from '../../../../Helpers/apiHelpers';

//setup State
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
    add: false,
    edit: false,
    button: {
        submit: true,
        clear: true,
    },
    nameButton: 'Thêm',
    student: createOject(''),
    status: createOject(false),
    error: createOject(null),
    style: createOject(null),
    log: '',
};

//handle data
const checkEmpty = (data) => /^$/.test(data);
const checkAll = (data) => /[!@#^$%^&*()_+={}[\]:;<>,.?~"'`\\/-]/.test(data);
const checkNum = (data) => /[0-9]/.test(data);
const checkChar = (data) => /[a-zA-Z]/.test(data);
const checkForNum = (data) => /[^.\w]/.test(data);
const checkForClass = (data) => /[^-_\w]/.test(data);
const dataCheckEmpty = (datas) =>
    Object.values(datas).some((value) => value !== '');

const testCase = (state, name, data) => {
    switch (name) {
        case 'MSSV':
            break;
        case 'Name':
            state.status[name] = !checkNum(data);
            if (!state.status[name]) state.error[name] = 'Tên không hợp lệ';
            else state.error[name] = null;
            break;
        case 'Birth':
            state.status[name] =
                !(new Date(data).getFullYear() > new Date().getFullYear()) &&
                !(new Date(data).getFullYear() < 1000);
            if (!state.status[name])
                state.error[name] = 'Thông tin ngày sinh không hợp lệ';
            else state.error[name] = null;
            break;
        case 'Faculty':
            state.status[name] = !checkNum(data);
            if (!state.status[name]) state.error[name] = 'Khoa không hợp lệ';
            else state.error[name] = null;
            break;
        case 'QT':
        case 'GK':
        case 'CK':
            state.status[name] =
                !(data < 0 || data > 10) &&
                !(data[0] === '.' || data[2] === '.' || data[3] === '.') &&
                !checkChar(data) &&
                !checkForNum(data);
            if (!state.status[name]) state.error[name] = 'Điểm không hợp lệ';
            else state.error[name] = null;
            break;
        case 'Class':
            state.status[name] = !checkForClass(data);
            if (!state.status[name]) state.error[name] = 'Mã Lớp không hợp lệ';
            else state.error[name] = null;
            break;
        default:
            throw new Error(`Name is invalid ${name}`);
    }
};

const checkData = (state, action) => {
    const { value, name } = action.payload;
    state.status[name] = !checkEmpty(value);
    if (checkEmpty(value)) return;
    if (!['Class', 'QT', 'GK', 'CK', 'Birth'].includes(name)) {
        state.status[name] = !checkAll(value);
        if (!state.status[name])
            state.error[name] = 'Không được chứa kí tự đặc biệt';
        else state.error[name] = null;
        if (checkAll(value)) return;
    }
    testCase(state, name, value);
};

const addInfoError = (state) => {
    Object.entries(state.status).forEach(([item, value]) => {
        if (!value) {
            state.style[item] = { border: '1px solid red' };
        } else {
            state.style[item] = { border: '1px solid green' };
        }
    });
};

const deleteInfoError = (state, action) => {
    Object.entries(state.status).forEach(([item]) => {
        if (item === action.payload.name) {
            state.style[item] = null;
        }
    });
};
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
            state.student = { ...state.student, ...action.payload };
            state.log = props.clear;
            state.status = createOject(false);
        },
        setLogNull: (state) => {
            state.log = '';
        },
        setNameButton: (state, action) => {
            state.nameButton = action.payload;
        },
        setSatus: (state) => {
            state.status = createOject(true);
        },
        setAddorEdit: (state) => {
            state.add = false;
            state.edit = false;
        },
        deleteInfoError: deleteInfoError,
        addInfoError: addInfoError,
        checkData: checkData,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.button.submit = false;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.add = true;
                state.log = { ...props.success, des: action.payload.message };
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.add = false;
                state.button.submit = true;
                state.log = { ...props.error, des: action.payload.message };
                const target = action.payload.target;
                if (target) {
                    state.status[target] = false;
                    state.style[target] = { border: '1px solid red' };
                    state.error[target] = action.payload.message;
                }
            })
            .addCase(editStudent.pending, (state) => {
                state.loading = true;
                state.button.submit = false;
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.status = createOject(false);
                state.edit = true;
                state.log = { ...props.edit, des: action.payload.message };
            })
            .addCase(editStudent.rejected, (state, action) => {
                const target = action.payload.target;
                state.loading = false;
                state.edit = false;
                state.log = { ...props.error, des: action.payload.message };
                if (target) {
                    state.status[target] = false;
                    state.style[target] = { border: '1px solid red' };
                    state.error[target] = action.payload.message;
                }
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
    async (data, Thunk) => fetchApiData(updateStudent, data, Thunk),
);
