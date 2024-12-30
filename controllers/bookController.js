const {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
  } = require('../models/bookModel');
  
  const getAllBooks = async (req, res) => {
    try {
      const books = await getBooks();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getSingleBook = async (req, res) => {
    try {
      const book = await getBookById(req.params.id);
      if (book) res.status(200).json(book);
      else res.status(404).json({ error: 'Book not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const createBook = async (req, res) => {
    try {
      const newBook = await addBook(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const editBook = async (req, res) => {
    try {
      const updatedBook = await updateBook(req.params.id, req.body);
      res.status(200).json(updatedBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const removeBook = async (req, res) => {
    try {
      await deleteBook(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllBooks, getSingleBook, createBook, editBook, removeBook };
  