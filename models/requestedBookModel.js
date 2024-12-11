const mongoose = require('mongoose')

const requestedBookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    bookPic: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentBranch: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    }
})

const requestedBooks = mongoose.model("requestedBooks", requestedBookSchema)

module.exports = requestedBooks;