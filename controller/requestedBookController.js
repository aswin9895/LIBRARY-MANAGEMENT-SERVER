const requestedBooks = require('../models/requestedBookModel')
const issuedBooks = require('../models/issuedBooks')

// post requestBookController
exports.requestBookController = async (req, res) => {
    console.log("inside requestBookController");
    const { bookId, title, author, publisher, bookPic, copies, studentName, studentBranch, studentId } = req.body
    console.log(req.body);
    const existingIssued = await issuedBooks.findOne({ bookId, studentId })
    const existingRequest = await requestedBooks.findOne({ bookId, studentId })
    if (existingIssued) {
        res.status(406).json("Book alredy issued to you!!!")
    } else {
        if (existingRequest) {
            return res.status(406).json("Book is already requested by you. Please Wait For the Admin's Response!!!")
        } else {
            try {
                const newRequest = new requestedBooks({
                    bookId, title, author, publisher, bookPic, copies, studentName, studentBranch, studentId
                })
                await newRequest.save()
                res.status(200).json(newRequest)
            } catch (error) {
                res.status(401).json(error)
            }
        }
    }
}

// getRequestedBookController
exports.getRequestedBookController = async (req, res) => {
    console.log("inside getRequestedBookController");
    try {
        const allRequestedBooks = await requestedBooks.find()
        res.status(200).json(allRequestedBooks)
    } catch (error) {
        res.status(401).json(error)
    }
}

// rejectRequestBookController
exports.rejectRequestBookController = async (req, res) => {
    console.log("inside rejectRequestBookController");
    const { id } = req.params
    console.log(id);
    try {
        const rejectRequest = await requestedBooks.findByIdAndDelete({ _id: id })
        res.status(200).json(rejectRequest)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getSingleBookRequestDetailController
exports.getSingleBookRequestDetailController = async (req, res) => {
    console.log("inside getSingleBookRequestDetailController");
    const { id } = req.params
    console.log(id);
    try {
        const singleRequestDetail = await requestedBooks.findById({ _id: id })
        res.status(200).json(singleRequestDetail)
    } catch (error) {
        res.status(401).json(error)
    }
}