const issuedBooks = require('../models/issuedBooks')

// issueBookController (post)
exports.issueBookController = async (req, res) => {
    console.log("inside issue bookcontroller");
    const { bookId, title, author, publisher, bookPic,copies, studentName, studentBranch, studentId, issuedDate, returnDate } = req.body
    const existingIssued = await issuedBooks.findOne({ bookId, studentId })
    if (existingIssued) {
        res.status(406).json("Book alredy issued")
    } else {
        try {
            const issue = new issuedBooks({
                bookId, title, author, publisher, bookPic,copies, studentName, studentBranch, studentId, issuedDate, returnDate
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
    try {
        const getissuedBooks = await issuedBooks.find()
        res.status(200).json(getissuedBooks)
    } catch (error) {
        res.status(401).json(error)
    }
    
}