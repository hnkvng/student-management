//PageAdd
const formStudent = (state) => state.form.student;
const infoInputStudent = (state) => state.form.info;
const styleInputStudent = (state) => state.form.style;
const statusInputStudent = (state) => state.form.status;
const infoLog = (state) => state.form.log;
const statusButton = (state) => state.form.button;
const getNameButton = (state) => state.form.nameButton;
const getStatusAdd = (state) => state.form.add;
const getStatusEdit = (state) => state.form.edit;
export {
    formStudent,
    infoInputStudent,
    statusButton,
    styleInputStudent,
    statusInputStudent,
    infoLog,
    getNameButton,
    getStatusAdd,
    getStatusEdit,
};

//PageStudent
const getInfoStudent = (state) => state.table.student;
const getInfoClasses = (state) => state.table.classes;
const getCurrentIdClasses = (state) => state.table.class.classesId;
const getCurrentNameClasses = (state) => state.table.class.classesName;
const getOptionCurrent = (state) => state.table.optionsCurrent;
const getIconCurrent = (state) => state.table.iconCurrent;
const getStudentEdit = (state) => state.table.studentEdit;

export {
    getInfoStudent,
    getInfoClasses,
    getCurrentIdClasses,
    getCurrentNameClasses,
    getOptionCurrent,
    getIconCurrent,
    getStudentEdit,
};
