const Student = require('../models/student');
const Classroom = require('../models/student');

class AddController {
    add(req, res, next) {
        try {
            const formdata = this.calculateTB(req.body);
            const uploadStudent = this.saveStudent(formdata);
            this.updateClassroom(req.body.Class, uploadStudent);
            res.send('add successfully');
        } catch (error) {
            next(error);
        }
    }

    calculateTB(data) {
        const sum = parseInt(data.QT) + parseInt(data.GK) + parseInt(data.CK);
        const TB = Math.round(sum / 3);
        return { ...data, TB: TB };
    }

    saveStudent(formdata) {
        const uploadStudent = new Student(formdata);
        return uploadStudent.save();
    }

    async updateClassroom(modelName, student) {
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
    }
}

module.exports = new AddController();
