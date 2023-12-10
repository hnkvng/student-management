const Classroom = require('../models/classroom');

// Điều khiển

class classControllers {
    //GET /class
    show(req, res, next) {
        Classroom.find()
            .then((classes) => {
                res.json({ classes });
            })
            .catch(next);
    }
}

module.exports = new classControllers();
