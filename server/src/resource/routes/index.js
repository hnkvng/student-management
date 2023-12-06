const home = require('./home');
const student = require('./student');
const add = require('./add');
const edit = require('./edit');
const deletes = require('./delete');
const classroom = require('./classroom');
function route(app) {
    // app.use('/', home);
    app.use('/api/student', student);
    app.use('/api/add', add);
    app.use('/api/classroom', classroom);
    app.use('/api/edit', edit);
    app.use('/api/delete', deletes);
}

module.exports = route;
