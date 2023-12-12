//Log
const getLog = (state) => state.log.log;

export { getLog };
//PageAdd
const formStudent = (state) => state.form.student;
const errorInputStudent = (state) => state.form.error;
const getLogForm = (state) => state.form.log;
const styleInputStudent = (state) => state.form.style;
const statusInputStudent = (state) => state.form.status;
const statusButton = (state) => state.form.button;
const getNameButton = (state) => state.form.nameButton;
const getStatusAdd = (state) => state.form.add;
const getStatusEdit = (state) => state.form.edit;
export {
    formStudent,
    errorInputStudent,
    statusButton,
    styleInputStudent,
    statusInputStudent,
    getNameButton,
    getStatusAdd,
    getStatusEdit,
    getLogForm,
};

//PageStudent
const getInfoStudent = (state) => state.table.student;
const getInfoClasses = (state) => state.table.classes;
const getCurrentIdClasses = (state) => state.table.class.classesId;
const getCurrentNameClasses = (state) => state.table.class.classesName;
const getOptionCurrent = (state) => state.table.optionsCurrent;
const getIconCurrent = (state) => state.table.iconCurrent;
const getStudentEdit = (state) => state.table.studentEdit;
const getTargetDelete = (state) => state.table.targetDelete;
const getDelete = (state) => state.table.delete;
const getLogTable = (state) => state.table.log;
const getNewNameClass = (state) => state.table.newClass;
const getOpenClass = (state) => state.table.openClass;
export {
    getInfoStudent,
    getInfoClasses,
    getCurrentIdClasses,
    getCurrentNameClasses,
    getOptionCurrent,
    getIconCurrent,
    getStudentEdit,
    getDelete,
    getLogTable,
    getTargetDelete,
    getNewNameClass,
    getOpenClass,
};
