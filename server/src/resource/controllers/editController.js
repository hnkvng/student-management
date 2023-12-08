const Student = require('../models/student');
const Classroom = require('../models/classroom');
// Điều khiển
class editControllers {
    //[PUT] => http://localhost:3000/student/:studentId/edit
    edit(rep, res, next) {
        const studentId = rep.query._id;
        Student.findOne({ _id: studentId })
            .then((student) => {
                res.json({ student });
            })
            .catch((error) => {
                res.status(404).json({ message: 'Có lỗi xảy ra!' });
            });
    }
}

module.exports = new editControllers();
