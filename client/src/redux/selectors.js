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
const getCurrentIdClasses = (state) => state.table.class.classesId;
const getCurrentNameClasses = (state) => state.table.class.classesName;
const getIconCurrent = (state) => state.table.iconCurrent;

export {
    getInfoStudent,
    getInfoClasses,
    getCurrentIdClasses,
    getCurrentNameClasses,
    getIconCurrent,
};
