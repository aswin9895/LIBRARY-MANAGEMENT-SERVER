const express = require('express');
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const requestedBookController = require('../controller/requestedBookController')
const issuedBookController = require('../controller/issuedbookController')

const router = new express.Router();

// registerUser - no need of authorisatiom
router.post('/register', userController.registerUserController)

// loginUser - no need of authorisatiom
router.post('/login', userController.loginUserController)

// getallUser - need of autorisation
router.get('/getalluser', jwtMiddleware, userController.getAllUsersController)

// removeUser - need of authorisation
router.delete('/removeuser/:id/remove', jwtMiddleware, userController.removeUserController)

// addBook -  authorisation needed
router.post('/addBook', jwtMiddleware, multerMiddleware.single("bookPic"), bookController.addBookController)

// getBook - need of authorisation
router.get('/getbook', jwtMiddleware, bookController.getBookController)

// deleteBook - need of authorisation
router.delete('/deletebook/:id/delete', jwtMiddleware, bookController.deleteBookController)

// editBook - need of authorisation
router.put('/editbook/:id/edit', jwtMiddleware, multerMiddleware.single("bookPic"), bookController.editBookController)

// getSingleBook - need of authorisation 
router.get('/getsinglebook/:id/get', jwtMiddleware, bookController.getSingleBookController)

// requestbook - need of authorisation
router.post('/requestbook', jwtMiddleware, requestedBookController.requestBookController)

// allRequestedBooks - need of authorisation
router.get('/allrequestedbooks', jwtMiddleware, requestedBookController.getRequestedBookController)

// rejectrequestbook - need of authorisation
router.delete('/rejectrequestbook/:id/reject', jwtMiddleware, requestedBookController.rejectRequestBookController)

// singleBookRequestDetail - need of authorisation 
router.get('/singlebookrequestdetail/:id/get', jwtMiddleware, requestedBookController.getSingleBookRequestDetailController)

// issueBook -need of authorisation
router.post('/issuebook', jwtMiddleware, issuedBookController.issueBookController)

// update book copies
router.put('/updatebookcopies/:id/update', jwtMiddleware, bookController.updateBookCopies)

// getissuedBooks - need of authorisation
router.get('/getissuedbooks', jwtMiddleware, issuedBookController.getissuedBooksController)



module.exports = router