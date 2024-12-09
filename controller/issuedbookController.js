const issuedBooks = require('../models/issuedBooks')

// issueBookController (post)
exports.issueBookController = async (req, res) => {
    console.log("inside issue bookcontroller");
    const { bookId, title, author, publisher, bookPic, copies, studentName, studentBranch, studentId, issuedDate, returnDate } = req.body
    const existingIssued = await issuedBooks.findOne({ bookId, studentId })
    if (existingIssued) {
        res.status(406).json("Book alredy issued")
    } else {
        try {
            const issue = new issuedBooks({
                bookId, title, author, publisher, bookPic, copies, studentName, studentBranch, studentId, issuedDate, returnDate
            })
            await issue.save()
            res.status(200).json(issue)
        } catch (error) {
            res.status(401).json(error)
        }
    }

}

// getissuedBooksController
exports.getissuedBooksController = async (req, res) => {
    console.log("Inside getissuedBooksController");
    const { field, value } = req.query
    const query = { [field]: { $regex: value, $options: "i" } }
    try {
        const getissuedBooks = await issuedBooks.find(query)
        res.status(200).json(getissuedBooks)
    } catch (error) {
        res.status(401).json(error)
    }

}

// removeissuedBooksController
exports.removeissuedBooksController = async (req, res) => {
    console.log("Inside removeissuedBooksController");
    const { id } = req.params
    try {
        const deleteIssuedBook = await issuedBooks.findByIdAndDelete({_id:id})
        res.status(200).json(deleteIssuedBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getsingleissuedBookController
exports.getsingleissuedBookController = async (req, res) => {
    console.log("Inside getsingleissuedBookController");
    const { id } = req.params
    try {
        const getIssuedBook = await issuedBooks.findById({_id:id})
        res.status(200).json(getIssuedBook)
    } catch (error) {
        res.status(401).json(error)
    }
}
