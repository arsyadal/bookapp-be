const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getSingleBook,
  createBook,
  editBook,
  removeBook,
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getSingleBook);
router.post('/', createBook);
router.put('/:id', editBook);
router.delete('/:id', removeBook);

module.exports = router;
