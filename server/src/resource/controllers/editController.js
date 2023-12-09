const Student = require('../models/student');
const Classroom = require('../models/classroom');

const updateClassroom = async (modelName, student) => {
    const target = await Classroom.find({ Name: modelName });
    if (target.length === 0) {
        const classroom = new Classroom({
            Name: modelName,
            Students: [student._id],
        });
        await classroom.save();
    } else {
        target[0].Students.push(student._id);
        await Classroom.updateOne({ _id: target[0]._id }, target[0]);
    }
};
const updateStudentInclass = async (studentId) => {
    const target = await Classroom.find();
    const Class = target.filter((e) => e.Students.includes(studentId));
    Class[0].Students = Class[0].Students.filter((e) => e != studentId);
    await Classroom.updateOne({ _id: Class[0]._id }, Class[0]);
};
// Điều khiển
class editControllers {
    //[PUT] => http://localhost:3000/student/:studentId/edit
    show(rep, res, next) {
        const studentId = rep.query._id;
        Student.findOne({ _id: studentId })
            .then((student) => {
                res.json({ student });
            })
            .catch((error) => {
                res.status(404).json({ message: 'Có lỗi xảy ra!' });
                next(error);
            });
    }
    async edit(rep, res, next) {
        const studentEdit = rep.body;
        try {
            const existingStudent = await Student.findOne({
                _id: studentEdit._id,
            });
            if (existingStudent) {
                await Student.updateOne({ _id: studentEdit._id }, studentEdit);
                await updateStudentInclass(studentEdit._id);
                await updateClassroom(studentEdit.Class, existingStudent);
                res.status(200).json({
                    message: 'Cập nhật sinh viên thành công!',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Có lỗi xảy ra!' });
            next(error);
        }
    }
}

module.exports = new editControllers();
