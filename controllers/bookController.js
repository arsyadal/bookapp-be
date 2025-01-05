const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await prisma.book.findUnique({ where: { id: parseInt(req.params.id) } });
    if (book) res.status(200).json(book);
    else res.status(404).json({ error: 'Book not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBook = async (req, res) => {
  const { title, author, genre, publishedYear, isbn, imageUrl } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        publishedYear: publishedYear ? parseInt(publishedYear) : null,
        isbn,
        imageUrl,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book', details: error.message });
  }
};

const editBook = async (req, res) => {
  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book', details: error.message });
  }
};
const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    // Check if the book exists
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        isAvailable: false,
        borrowedBy: parseInt(userId),
        borrowedAt: new Date(),
      },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: 'Failed to borrow book', details: error.message });
  }
};

const returnBook = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        isAvailable: true,
        borrowedBy: null,
        borrowedAt: null,
      },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Failed to return book', details: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  editBook,
  deleteBook,
  borrowBook,
  returnBook,
};