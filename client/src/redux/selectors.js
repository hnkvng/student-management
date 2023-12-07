//PageAdd
const infoInputStudent = (state) => state.form.info;
const styleInputStudent = (state) => state.form.style;
const statusInputStudent = (state) => state.form.status;
const infoLog = (state) => state.form.log;
const statusButton = (state) => state.form.button;
export {
    infoInputStudent,
    statusButton,
    styleInputStudent,
    statusInputStudent,
    infoLog,
};

//PageStudent
const getInfoStudent = (state) => state.table.student;
const getInfoClasses = (state) => state.table.classes;
const getCurrentIdClasses = (state) => state.table.classcurrent;

export { getInfoStudent, getInfoClasses, getCurrentIdClasses };
