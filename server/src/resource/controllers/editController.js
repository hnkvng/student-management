const Student = require('../models/student');
const Classroom = require('../models/classroom');
// Điều khiển
class editControllers {
    //[PUT] => http://localhost:3000/student/:studentId/edit
    edit(rep, res, next) {
        const sum =
            parseInt(rep.body.QT) +
            parseInt(rep.body.GK) +
            parseInt(rep.body.CK);
        const TB = Math.round(sum / 3);
        const formdata = { ...rep.body, TB: TB };
        Student.updateOne({ _id: rep.body._id }, formdata)
            .then((student) => {
                const modelNameToCheck = rep.body.Class;
                Classroom.find({ Name: modelNameToCheck }).then((e) => {
                    if (e == 0) {
                        const classroom = new Classroom({
                            Name: rep.body.Class,
                            Students: [student._id],
                        });
                        return classroom.save();
                    }
                    const newStudent = e.filter(
                        (item) => item.Name === rep.body.Class,
                    );
                    newStudent[0].Students.push(student._id);
                    return Classroom.updateOne(
                        { Name: modelNameToCheck },
                        newStudent[0],
                    );
                });
            })
            .then(() => {
                res.send('add successfully');
            })
            .catch(next);
    }
}

module.exports = new editControllers();
