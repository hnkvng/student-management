import axios from 'axios';

const getStudentApi = (classId) =>
    `http://localhost:4000/api/student/class?_id=${classId}`;
const getStudentEditApi = (studentId) =>
    `http://localhost:4000/api/student/edit?_id=${studentId}`;
const editStudentApi = 'http://localhost:4000/api/student/edit';
const editClassApi = 'http://localhost:4000/api/student/edit/classroom';
const deleteStudentApi = 'http://localhost:4000/api/student/delete';
const deleteClassApi = 'http://localhost:4000/api/student/delete/classroom';
const getClassApi = 'http://localhost:4000/api/classroom';
const addApi = 'http://localhost:4000/api/add';

const getStudent = (classId) => axios.get(getStudentApi(classId));
const getClass = (getClass) => axios.get(getClassApi, getClass);
const updateStudent = (studentEdit) => axios.put(editStudentApi, studentEdit);
const updateClass = (classEdit) => axios.put(editClassApi, classEdit);
const getStudentEdit = (studentId) => axios.get(getStudentEditApi(studentId));
const createStudent = (newStudent) => axios.post(addApi, newStudent);
const removeStudent = (Student) =>
    axios.delete(deleteStudentApi, { data: Student });
const removeClass = (classroomId) =>
    axios.delete(deleteClassApi, { data: classroomId });

export {
    createStudent,
    getStudent,
    getClass,
    updateStudent,
    getStudentEdit,
    removeStudent,
    removeClass,
    updateClass,
};
