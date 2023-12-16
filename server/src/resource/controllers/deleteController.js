const Student = require('../models/student');
const Classroom = require('../models/classroom');

const removeCommonElements = (arr1, arr2) => {
    arr1.forEach((e) => {
        arr2 = arr2.filter((item) => item != e);
    });
    return arr2;
};
const updateStudentInclass = async (studentId, ClassId) => {
    const target = await Classroom.findOne({ _id: ClassId });
    target.Students = removeCommonElements(studentId, target.Students);
    await Classroom.updateOne({ _id: ClassId }, target);
};
// Điều khiển
class deleteControllers {
    //[DELETE] => http://localhost:4000/student/delete
    async delete(req, res, next) {
        const modelClassIdToCheck = req.body.classroomId;
        const modelIdToCheck = req.body.studentId;
        try {
            await updateStudentInclass(modelIdToCheck, modelClassIdToCheck);
            const completeDelete = await Student.deleteMany({
                _id: modelIdToCheck,
            });
            if (completeDelete) {
                res.status(200).json({ message: 'Xóa sinh viên thành công!' });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Xóa sinh viên không thành công!',
            }),
                next(error);
        }
    }
    //[DELETE] => http://localhost:3000/student/deleteClass
    async deleteClass(req, res, next) {
        const modelClassIdToCheck = req.body.classroomId;
        try {
            const classRoom = await Classroom.findOne({
                _id: modelClassIdToCheck,
            });
            await Student.deleteMany({ Class: classRoom.Name });
            const complete = await Classroom.deleteOne({ _id: classRoom._id });
            if (complete) {
                res.status(200).json({ message: 'Xóa lớp thành công!' });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Xóa lớp không thành công!',
            });
            next(error);
        }
    }
}

module.exports = new deleteControllers();
