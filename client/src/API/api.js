import axios from 'axios';
const getStudentApi = (classId) =>
    `http://localhost:4000/api/student/class?_id=${classId}`;
const getStudentEditApi = (studentId) =>
    `http://localhost:4000/api/student/edit?_id=${studentId}`;
const setStudentEditApi = 'http://localhost:4000/api/student/edit';

const getClassApi = 'http://localhost:4000/api/classroom';
const addApi = 'http://localhost:4000/api/add';

const getStudent = (classId) => axios.get(getStudentApi(classId));
const getClass = (getClass) => axios.get(getClassApi, getClass);
const setStudentEdit = (studentEdit) =>
    axios.put(setStudentEditApi, studentEdit);
const getStudentEdit = (studentId) => axios.get(getStudentEditApi(studentId));
const createStudent = (newStudent) => axios.post(addApi, newStudent);

export { createStudent, getStudent, getClass, setStudentEdit, getStudentEdit };
