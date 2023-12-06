const Classroom = require('../models/classroom');

// Điều khiển

class classControllers {
    //GET /class
    show(rep, res, next) {
        Classroom.find()
            .then((Class) => {
                res.json({ Class });
            })
            .catch(next);
    }
}

module.exports = new classControllers();
