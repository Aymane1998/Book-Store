import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Input } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';
import { createBooksAsync } from '../../store/books/booksAsync';
import { resetCreateBooksRequest } from '../../store/books/BooksSlices/createBooksSlice';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .required('Title is required'),
  author: Yup.string()
    .min(2, 'Author must be at least 2 characters')
    .required('Author is required'),
  publishYear: Yup.number()
    .min(1000, 'publishYear must be a valid year')
    .required('publishYear is required'),
  description: Yup.string().max(300, 'Description is too long'),
  image: Yup.mixed().nullable(),
});

export const AddBookForm = () => {
    const dispatch = useAppDispatch()
    const cretaeBookRequest = useAppSelector((state)=> state.book.createBooks,
);

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      publishYear: '',
      description: '',
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Convert publishYear to a number
      const payload = {
        ...values,
        publishYear: Number(values.publishYear),
      };

      if (cretaeBookRequest.status !== ReduxStatus.Succeeded) {
        dispatch(createBooksAsync(payload));
      } else {
        dispatch(resetCreateBooksRequest());
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '400px',
        margin: '20px auto',
      }}
    >
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        id="author"
        name="author"
        label="Author"
        value={formik.values.author}
        onChange={formik.handleChange}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        multiline
        rows={4}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        fullWidth
        id="publishYear"
        name="publishYear"
        label="Publish Year"
        value={formik.values.publishYear}
        onChange={formik.handleChange}
        error={formik.touched.publishYear && Boolean(formik.errors.publishYear)}
        helperText={formik.touched.publishYear && formik.errors.publishYear}
      />
      <Input
        id="image"
        name="image"
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files
            ? event.currentTarget.files[0]
            : null;
          formik.setFieldValue('image', file);
        }}
      />
      <Button color="primary" variant="contained" type="submit">
        Add Book
      </Button>
    </Box>
  );
};
