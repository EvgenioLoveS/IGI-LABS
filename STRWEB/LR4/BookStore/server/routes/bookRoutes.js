const express = require('express');
const { createBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/bookController');
const sessionAuth = require('../middleware/SessionAuth'); 

const router = express.Router();

router.get('/', getBooks);

router.get('/:id', getBook);

router.post('/', sessionAuth, createBook);

router.put('/:id', sessionAuth, updateBook);

router.delete('/:id', sessionAuth, deleteBook);

module.exports = router;