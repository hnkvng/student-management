const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroom = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            uppercase: true,
        },
        Students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Classroom', classroom);
