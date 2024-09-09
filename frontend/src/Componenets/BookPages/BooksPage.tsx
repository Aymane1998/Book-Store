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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Book } from '../../utils/types/Book';
import { getBooksAsync } from '../../store/books/booksAsync';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';
import Default from '../../assets/default.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { AddBookForm } from '../AddBookPage/AddBookForm';

const BooksPage = () => {
  const dispatch = useAppDispatch();
  const [dataRows, setDataRows] = useState<Book[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const getBookRequest = useAppSelector((state) => state.book.getBooks);

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  useEffect(() => {
    if (getBookRequest.status === ReduxStatus.Succeeded) {
      setDataRows(getBookRequest.data.flat());
    }
  }, [getBookRequest]);

  const handleDelete = () => {
    alert('Book Deleted Successfully');
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
          {dataRows.map((row) => (
            <Grid item xs={10} sm={6} md={4} key={row.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={row.image ? row.image : Default}
                    alt={row.title}
                  />
                  <CardContent>
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
                          onClick={() => handleDelete()}
                          sx={{ fontSize: 30 }}
                          color="error"
                        />
                      </Tooltip>
                    </IconButton>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
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
    </Box>
  );
};

export default BooksPage;
