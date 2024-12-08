const mongoose = require('mongoose')

const issuedBookSchema = new mongoose.Schema({
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
    },
    issuedDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        required: true
    }
})

const issuedBooks = mongoose.model('issuedBooks', issuedBookSchema)

module.exports=issuedBooks