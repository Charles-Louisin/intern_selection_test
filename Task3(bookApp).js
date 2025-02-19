const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/bookApp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  description: String
});
const Book = mongoose.model('Book', bookSchema);


// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new book
app.post('/api/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    description: req.body.description
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update book
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;
    if (req.body.year) book.year = req.body.year;
    if (req.body.description) book.description = req.body.description;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});