import axios from 'axios';
const getStudentApi = 'http://localhost:4000/api/student';
const getClassApi = 'http://localhost:4000/api/classroom';
const addApi = 'http://localhost:4000/api/add';

const getStudent = (getStudent) => {
    axios.get(getStudentApi, getStudent);
};
const getClass = (getClass) => axios.get(getClassApi, getClass);
const createStudent = (newStudent) => axios.post(addApi, newStudent);

export { createStudent, getStudent, getClass };
