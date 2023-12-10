const Student = require('../models/student');
const Classroom = require('../models/classroom');
const Controllers = require('../controllers/addController');

const updateStudentInclass = async (studentId) => {
    const target = await Classroom.find();
    const Class = target.filter((e) => e.Students.includes(studentId));
    Class[0].Students = Class[0].Students.filter((e) => e != studentId);
    await Classroom.updateOne({ _id: Class[0]._id }, Class[0]);
};
// Điều khiển
class editControllers {
    //[PUT] => http://localhost:3000/student/:studentId/edit
    show(req, res, next) {
        const studentId = req.query._id;
        Student.findOne({ _id: studentId })
            .then((student) => {
                res.json({ student });
            })
            .catch((error) => {
                res.status(404).json({ message: 'Có lỗi xảy ra!' });
                next(error);
            });
    }
    async edit(req, res, next) {
        const studentEdit = req.body;
        try {
            const sameIdStudent = await Student.findOne({
                MSSV: studentEdit.MSSV,
            });
            if (sameIdStudent !== null)
                if (sameIdStudent._id != studentEdit._id) {
                    return res
                        .status(400)
                        .json({
                            message: 'ID sinh viên đã tồn tại.',
                            target: 'MSSV',
                        });
                }
            const newStudent = await Student.findOne({
                _id: studentEdit._id,
            });
            if (newStudent) {
                const formdata = Controllers.calculateTB(req.body);
                await Student.updateOne({ _id: studentEdit._id }, formdata);
                await updateStudentInclass(studentEdit._id);
                await Controllers.updateClassroom(
                    studentEdit.Class,
                    newStudent,
                );
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
