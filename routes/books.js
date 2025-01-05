// filepath: /Users/macintoshhd/Documents/PERPUS/bookapp-be/routes/books.js
const express = require('express');
const {
  getAllBooks,
  getSingleBook,
  createBook,
  editBook,
  removeBook,
  borrowBook,
  returnBook,
  deleteBook,
} = require('../controllers/bookController');
const router = express.Router();

// GET /api/books
router.get('/', getAllBooks);

// GET /api/books/:id
router.get('/:id', getSingleBook);

// POST /api/books
router.post('/', createBook);

// PUT /api/books/:id
router.put('/:id', editBook);

// DELETE /api/books/:id
router.delete('/:id', deleteBook);

// PUT /api/books/:id/borrow
router.put('/:id/borrow', borrowBook);

// PUT /api/books/:id/return
router.put('/:id/return', returnBook);

module.exports = router;