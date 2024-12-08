const books = require('../models/bookModel');

// addBookController (post)
exports.addBookController = async (req, res) => {
    console.log("inside addbokk controller");
    const { title, author, publisher, copies } = req.body
    const bookPic = req.file.filename
    console.log(title, author, publisher, copies, bookPic);
    try {
        const existingBook = await books.findOne({ title, author })
        if (existingBook) {
            res.status(406).json("Book Alredy Exists!!!")
        } else {
            const newBook = new books({
                title, author, publisher, copies, bookPic
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// getBookController
exports.getBookController = async (req, res) => {
    console.log("inside getBookController");
    const { field, value } = req.query
    console.log(`Field: ${field}, Value: ${value}`);
    const query = { [field]: { $regex: value, $options: "i" } }
    try {
        const getAllBook = await books.find(query)
        res.status(200).json(getAllBook)

    } catch (error) {
        res.status(401).json(error)
    }
    // res.status(200).json("recevied")    
}
// deleteBookController
exports.deleteBookController = async (req, res) => {
    console.log("inside deleteBookController");
    const { id } = req.params
    console.log(id);
    try {
        const deleteBook = await books.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// editBookController
exports.editBookController = async (req, res) => {
    console.log("inside editBookController");
    const { id } = req.params
    const { title, author, publisher, copies, bookPic } = req.body
    const reuploadPic = req.file ? req.file.filename : bookPic
    console.log(id, title, author, publisher, copies, bookPic);
    try {
        const updateBook = await books.findByIdAndUpdate({ _id: id }, { title, author, publisher, copies, bookPic: reuploadPic }, { new: true })
        await updateBook.save()
        res.status(200).json(updateBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// getSingleBookController
exports.getSingleBookController = async (req, res) => {
    console.log("inside getSingleBookController");
    const { id } = req.params
    console.log(id);
    try {
        const getSingleBook = await books.findById({ _id: id })
        res.status(200).json(getSingleBook)
    } catch (error) {
        res.status(401).json(error)
    }
}

// updateBookCopies
exports.updateBookCopies = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await books.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.copies <= 0) return res.status(400).json({ message: "No copies available" });
        book.copies -= 1;
        await book.save();
        res.status(200).json({ message: "Copies decremented successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}