const Student = require('../models/student');
const Classroom = require('../models/classroom');

// Điều khiển
class deleteControllers {
    //[DELETE] => http://localhost:4000/student/delete
    delete(req, res, next) {
        const modelClassIdToCheck = req.body.classroomId;
        const modelIdToCheck = req.body.studentId;
        Promise.all([
            Classroom.find({ _id: modelClassIdToCheck }),
            Student.deleteOne({ _id: modelIdToCheck }),
        ])
            .then(([targetClass, studentid]) => {
                targetClass[0].Students.pop(req.body.studentId);
                Classroom.updateOne(
                    { _id: modelClassIdToCheck },
                    targetClass[0],
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: 'Xóa sinh viên thành công!' }),
                    )
                    .catch(() =>
                        res
                            .status(500)
                            .json({
                                message: 'Xóa sinh viên không thành công!',
                            }),
                    );
            })
            .catch(() => res.status(500).json({ message: 'có lỗi xảy ra!' }));
    }
    //[DELETE] => http://localhost:3000/student/deleteAll
    deleteAll(req, res, next) {
        Student.deleteMany({ Class: req.body.classroomId })
            .then(() => res.send({ message: 'delete successfully' }))
            .catch(next);
    }
    //[DELETE] => http://localhost:3000/student/deleteClass
    async deleteClass(req, res, next) {
        const modelClassIdToCheck = req.body.classroomId;
        try {
            const classRoom = await Classroom.findOne({
                _id: modelClassIdToCheck,
            });
            const student = await Student.find();
            const x = classRoom.Students.filter((e) => student.includes(e));
            console.log(x);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new deleteControllers();
