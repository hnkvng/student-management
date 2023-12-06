const Student = require('../models/student');
const Classroom = require('../models/classroom');

// Điều khiển
class deleteControllers {
    //[DELETE] => http://localhost:3000/student/delete
    delete(rep, res, next) {
        const modelClassIdToCheck = rep.body.classroomId;
        const modelIdToCheck = rep.body.studentId;
        Promise.all([
            Classroom.find({ _id: modelClassIdToCheck }),
            Student.deleteOne({ _id: modelIdToCheck }),
        ])
            .then(([targetClass, studentid]) => {
                targetClass[0].Students.pop(rep.body.studentId);
                Classroom.updateOne(
                    { _id: modelClassIdToCheck },
                    targetClass[0],
                )
                    .then(() => res.send({ message: 'delete successfully' }))
                    .catch(next);
            })
            .catch(next);
    }
    //[DELETE] => http://localhost:3000/student/deleteAll
    deleteAll(rep, res, next) {
        Student.deleteMany({ Class: rep.body.classroomId })
            .then(() => res.send({ message: 'delete successfully' }))
            .catch(next);
    }
    //[DELETE] => http://localhost:3000/student/deleteClass
    deleteClass(rep, res, next) {
        const modelClassIdToCheck = rep.body.classroomId;
        const modelNameToCheck = rep.body.classroom;
        if (modelNameToCheck === 'Tổng hợp') {
            Classroom.deleteMany()
                .then(() => {
                    Student.deleteMany()
                        .then(() =>
                            res.send({ message: 'delete successfully' }),
                        )
                        .catch(next);
                })
                .catch(next);
        } else {
            Classroom.deleteOne({ _id: modelClassIdToCheck })
                .then(() => {
                    Student.deleteMany({ Class: modelNameToCheck })
                        .then(() =>
                            res.send({ message: 'delete successfully' }),
                        )
                        .catch(next);
                })
                .catch(next);
        }
    }
}

module.exports = new deleteControllers();
