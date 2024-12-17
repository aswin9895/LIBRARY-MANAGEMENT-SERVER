const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phn: {
        type: Number,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true
    },
    admnum: {
        type: Number,
        required: true,
        unique: true
    },
    admyear: {
        type: Number,
        required: true
    }
})

const students = mongoose.model("students", studentSchema)

module.exports = students