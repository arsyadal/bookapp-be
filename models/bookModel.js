const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBooks = async () => {
  return await prisma.book.findMany();
};

const getBookById = async (id) => {
  return await prisma.book.findUnique({ where: { id: parseInt(id) } });
};

const addBook = async (book) => {
  return await prisma.book.create({
    data: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      isbn: book.isbn,
      imageUrl: book.imageUrl,
      isAvailable: book.isAvailable,
    },
  });
};

const updateBook = async (id, book) => {
  return await prisma.book.update({
    where: { id: parseInt(id) },
    data: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      isbn: book.isbn,
      imageUrl: book.imageUrl,
      isAvailable: book.isAvailable,
    },
  });
};

const deleteBook = async (id) => {
  return await prisma.book.delete({ where: { id: parseInt(id) } });
};

const borrowBook = async (id, userId) => {
  return await prisma.book.update({
    where: { id: parseInt(id) },
    data: {
      isAvailable: false,
      borrowedBy: userId,
      borrowedAt: new Date(),
    },
  });
};

const returnBook = async (id) => {
  return await prisma.book.update({
    where: { id: parseInt(id) },
    data: {
      isAvailable: true,
      borrowedBy: null,
      borrowedAt: null,
    },
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};