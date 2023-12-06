const Student = require('../models/student');
const Classroom = require('../models/classroom');

const calculateTB = (data) => {
    if (
        isNaN(parseFloat(data.QT)) &&
        isNaN(parseFloat(data.QT)) &&
        isNaN(parseFloat(data.CK))
    )
        return false;
    const sum = parseFloat(data.QT) + parseFloat(data.GK) + parseFloat(data.CK);
    const TB = Math.round(sum / 3);
    return { ...data, TB: TB };
};
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
        await Classroom.updateOne({ Name: modelName }, target[0]);
    }
};
class AddController {
    add(req, res, next) {
        try {
            const formdata = calculateTB(req.body);
            if (!formdata) throw new Error('Error calc point TB');
            const uploadStudent = new Student(formdata);
            uploadStudent.save();
            updateClassroom(req.body.Class, uploadStudent)
                .then(() => {
                    res.send('thêm sinh viên thành công!');
                })
                .catch((error) => {
                    res.send('có lỗi xảy ra, thêm không thành công!');
                    next(error);
                });
        } catch (error) {
            res.send('add not successfully');
            next(error);
        }
    }
}

module.exports = new AddController();
