const express = require('express')
const controller = require('../controllers/book.controllers')

const router = express.Router()

router.get('/books', controller.getAllBooks)

router.get('/books/:id', controller.getBookById)

router.post('/books', controller.createBook)

router.delete('/books/:id', controller.deleteBook)

module.exports = router;