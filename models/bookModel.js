const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
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
    copies: {
        type: Number,
        required: true
    },
    bookPic: {
        type: String,
        required: true
    },
})

const books = mongoose.model("books", bookSchema)
module.exports = books;