import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Button,
  CardActions,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Book } from '../../utils/types/Book';
import { deleteBookAsync, getBooksAsync } from '../../store/books/booksAsync';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';
import Default from '../../assets/default.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { AddBookForm } from '../AddBookPage/AddBookForm';
import { resetDeleteBookRequest } from '../../store/books/BooksSlices/deleteBookSlice';

const BooksPage = () => {
  const dispatch = useAppDispatch();
  const [dataRows, setDataRows] = useState<Book[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const getBookRequest = useAppSelector((state) => state.book.getBooks);
  const deleteBookRequest = useAppSelector((state)=> state.book.deleteBook)

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  useEffect(() => {
    if (getBookRequest.status === ReduxStatus.Succeeded) {
      setDataRows(getBookRequest.data.flat());
    }
  }, [getBookRequest]);

  useEffect(() => {
    if (deleteBookRequest.status === ReduxStatus.Succeeded) {
      setSnackbarMessage('The Book was deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      // Reset the deletion status after handling
      dispatch(resetDeleteBookRequest());
    } else if (deleteBookRequest.status === ReduxStatus.Failed) {
      setSnackbarMessage(
        'There was an error while deleting the book, please try again'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      // Reset the deletion status after handling
      dispatch(resetDeleteBookRequest());
    }
  }, [deleteBookRequest.status, dispatch]);

  const handleDelete = (id:string) => {
      dispatch(deleteBookAsync(id))
  };
  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const defaultDescription = 'Fuerit toto in consulatu sine provincia...';

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'grey',
        borderRadius: '10px',
        padding: '15px',
        margin: '80px 20px',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            My Book Library
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleClickOpen}
            >
              Add Book
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          margin: '0 auto',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Toolbar />
        <Grid container spacing={5}>
          {dataRows.map((row) => {
            return (
              <Grid item xs={10} sm={6} md={4} key={row._id}>
                <Card sx={{ maxWidth: 345, height: '100%' }}>
                  {' '}
                  {/* Set the card to 100% height to fill its parent */}
                  <CardActionArea
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {' '}
                    {/* Flex container for full height */}
                    <CardMedia
                      component="img"
                      height="140"
                      image={row.image ? row.image : Default}
                      alt={row.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {' '}
                      {/* Allow content to grow to fill space */}
                      <Typography gutterBottom variant="h5" component="div">
                        {row.title}
                      </Typography>
                      <Typography gutterBottom variant="h4" component="div">
                        {row.publishYear}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        {row.description ? row.description : defaultDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="edit">
                        <Tooltip arrow title="Edit">
                          <EditIcon sx={{ fontSize: 30 }} color="primary" />
                        </Tooltip>
                      </IconButton>
                      <IconButton aria-label="delete">
                        <Tooltip arrow title="Delete">
                          <DeleteForeverIcon
                            onClick={() => handleDelete(row._id)}
                            sx={{ fontSize: 30 }}
                            color="error"
                          />
                        </Tooltip>
                      </IconButton>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Dialog for Add Book Form */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Book</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <AddBookForm />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BooksPage;
