const Student = require('../models/student');
const Classroom = require('../models/classroom');

// Điều khiển

class studentControllers {
    //GET /student
    show(rep, res, next) {
        const id = rep.body;
        console.log(id);
        // Promise.all([Classroom.findOne({_id: id}), Student.find()])
        //     .then(([classes, student]) => {
        //         // const x = classes.Students.filter((_id) => student.includes(_id))
        //         // console.log(x);
        //     })
    }
}

module.exports = new studentControllers();
