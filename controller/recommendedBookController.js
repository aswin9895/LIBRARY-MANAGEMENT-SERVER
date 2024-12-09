const recommendedBooks = require('../models/recommendedBookModel')

// recommendBookController
exports.recommendBookController=async (req,res) => {
    console.log("inside recommendBookController");
    const {title,author,publisher,studentName,studentBranch}=req.body
    try {
        const newBook = new recommendedBooks({
            title,author,publisher,studentName,studentBranch
        })
        await newBook.save()
        res.status(200).json(newBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getrecomendedBookController
exports.getRecommendedBookController=async (req,res) => {
    console.log("inside getRecommendedBookController");
    try {
        const recomendBook = await recommendedBooks.find()
        res.status(200).json(recomendBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// removerecomendBookController
exports.removeRecommendedBookController=async (req,res) => {
    console.log("inside removeRecommendedBookController");
    const {id}=req.params
    try {
        const removeBook = await recommendedBooks.findByIdAndDelete({_id:id})
        res.status(200).json(removeBook)
    } catch (error) {
        res.status(401).json(error)
    }
}