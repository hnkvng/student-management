const Student = require('../models/student');

// Điều khiển

class studentControllers {
    //GET /student
    show(rep, res, next) {
        Student.find()
            .then((student) => {
                student = student.map((element, index) => {
                    return {
                        _id: element.id,
                        STT: index + 1,
                        MSSV: element.MSSV,
                        Name: element.Name,
                        Birth: `${element.Birth.getDate()}/${
                            element.Birth.getMonth() + 1
                        }/${element.Birth.getFullYear()}`,
                        Faculty: element.Faculty,
                        QT: element.QT,
                        GK: element.GK,
                        CK: element.CK,
                        TB: element.TB,
                        Class: element.Class,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt,
                    };
                });
                res.json({ student });
            })
            .catch(next);
    }
}

module.exports = new studentControllers();
