import express from 'express';
import { Book } from '../models/bookModel.js';
import multer from 'multer';
const router = express.Router();

// Configure multer to store images in an 'uploads/' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


// Route for saving a new Book with image file
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const books = Array.isArray(req.body.books) ? req.body.books : [req.body];
    const savedBooks = [];

    for (const book of books) {
      const { title, author, publishYear, description } = book;
      const imagePath = req.file ? req.file.path : '';

      if (!title || !author || !publishYear || !description) {
        return res.status(400).send({
          message:
            'Please send all required fields: title, author, publishYear, description',
        });
      }

      const newBook = {
        title,
        author,
        publishYear,
        description,
        image: imagePath, // Use file path for the image
      };

      const savedBook = await Book.create(newBook);
      savedBooks.push(savedBook);
    }

    if (savedBooks.length === 1) {
      return res.status(201).send(savedBooks[0]);
    }

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
    return res.status(200).json([books]);
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
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear, description } = req.body;

    if (!title || !author || !publishYear || !description) {
      return res.status(400).send({
        message:
          'Please provide all required fields: title, author, publishYear, description',
      });
    }

    const imagePath = req.file ? req.file.path : undefined;

    const updatedBook = {
      title,
      author,
      publishYear,
      description,
    };

    if (imagePath) {
      updatedBook.image = imagePath; // Update only if a new image is provided
    }

    const result = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res
      .status(200)
      .send({ message: 'Book updated successfully', book: result });
  } catch (error) {
    console.error(error.message);
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