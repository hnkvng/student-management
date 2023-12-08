const Student = require('../models/student');
const Classroom = require('../models/classroom');

// Điều khiển

class studentControllers {
    //GET /student
    show(rep, res, next) {
        const id = rep.query._id.toString();
        if (id === '' || id === undefined || id === null)
            return res.json({ Student: [], Classes: null });
        Promise.all([Classroom.findOne({ _id: id }), Student.find()])
            .then(([classes, student]) => {
                if (classes != 0) {
                    const studentInClass = student.filter((e) =>
                        classes.Students.includes(e._id),
                    );
                    res.json({
                        Student: studentInClass,
                        Classes: classes.Name,
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: 'Đã có lỗi xảy ra' });
                next(error);
            });
    }
}

module.exports = new studentControllers();
