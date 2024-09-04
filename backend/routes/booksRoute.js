import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for save a new Book
router.post('/', async (req, res) => {
  try {
    const books = Array.isArray(req.body) ? req.body : [req.body]; // Convert single object to array

    // Array to hold the saved books
    const savedBooks = [];

    for (const book of books) {
      const { title, author, publishYear, image } = book;

      if (!title || !author || !publishYear) {
        return res.status(400).send({
          message:
            'Please send all required fields: title, author, publishYear',
        });
      }

      const newBook = {
        title,
        author,
        publishYear,
        image: image || '', // Default to an empty string if image is not provided
      };

      const savedBook = await Book.create(newBook);
      savedBooks.push(savedBook);
    }

    // If only one book was sent (not an array), return just that book
    if (savedBooks.length === 1) {
      return res.status(201).send(savedBooks[0]);
    }

    // If an array was sent, return the array of saved books
    return res.status(201).send(savedBooks);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route for GET all Books

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for GET Book by Id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(404)
        .send({
          message:
            'Please send all required fields: title, author, publishYear',
        });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for Delete a Book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;