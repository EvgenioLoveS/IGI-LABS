const Book = require('../models/Book.js');
const Category = require('../models/Category');

exports.createBook = async (req, res) => {
  try {
    const { category, title, author, genre, price, coverColor, imageUrl } = req.body;

    // Проверим, что категория существует
    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const book = new Book({ category, title, author, genre, price, coverColor, imageUrl });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let query = {};

    // Поиск по title или author
    if (req.query.search) {
      const search = req.query.search;
      query = {
        $or: [
          { title: new RegExp(search, 'i') },
          { author: new RegExp(search, 'i') }
        ]
      };
    }

    let booksQuery = Book.find(query).populate('category');

    // Сортировка
    if (req.query.sort) {
      const order = req.query.order === 'desc' ? -1 : 1;
      const sortField = req.query.sort;
      booksQuery = booksQuery.sort({ [sortField]: order });
    }

    const books = await booksQuery.exec();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { category, title, author, genre, price, coverColor, imageUrl } = req.body;

    // Если обновляют категорию, проверим что она есть
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { category, title, author, genre, price, coverColor, imageUrl, updatedAt: new Date() },
      { new: true }
    );

    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
