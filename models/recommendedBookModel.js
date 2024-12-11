const mongoose = require('mongoose')

const recommendedBookSchema = new mongoose.Schema({
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
    studentName: {
        type: String,
        required: true
    },
    studentBranch: {
        type: String,
        required: true
    }
})

const recommendedBooks = mongoose.model("recommendedBooks", recommendedBookSchema)
module.exports = recommendedBooks;