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
    async add(req, res, next) {
        try {
            const formdata = calculateTB(req.body);
            const studentId = req.body.MSSV;
            const sameIdStudent = await Student.findOne({ MSSV: studentId });
            if (sameIdStudent) {
                return res
                    .status(400)
                    .json({
                        message: 'ID sinh viên đã tồn tại.',
                        target: 'MSSV',
                    });
            }
            if (!formdata) {
                return res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
            }
            const uploadStudent = new Student(formdata);
            uploadStudent.save();
            updateClassroom(req.body.Class, uploadStudent)
                .then(() => {
                    res.status(201).json({
                        message: 'Thêm sinh viên thành công.',
                    });
                })
                .catch((error) => {
                    res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
                    next(error);
                });
        } catch (error) {
            res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
            next(error);
        }
    }
}

module.exports = {
    AddController: new AddController(),
    updateClassroom: updateClassroom,
    calculateTB: calculateTB,
};
