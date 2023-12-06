import axios from 'axios';
const addApi = 'http://localhost:4000/api/add';

const createStudent = (newStudent) => axios.post(addApi, newStudent);
export { createStudent };
