/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Book } from '../../utils/types/Book';
import { getBooksAsync } from '../../store/books/booksAsync';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import Default from '../../assets/default.png'
const BooskPage = () => {
  const dispatch = useAppDispatch();
  const [dataRows, setDataRows] = useState<Book[]>([]);
  const getBookRequest = useAppSelector(
    (state) => state.book.getBooks
  );
  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  console.log('typeof(dataRows)', typeof dataRows);

  useEffect(() => {
    if (getBookRequest.status === ReduxStatus.Succeeded) {
      setDataRows(getBookRequest.data);
      console.log('dataRows', dataRows);
    }
  }, [getBookRequest]);

  const defaultDescription =
    'Fuerit toto in consulatu sine provincia, cui fuerit, antequam designatus est, decreta provincia. Sortietur an non? Nam et non sortiri absurdum est, et, quod sortitus sis, non habere. ';

  return (
    <Box>
      {Array.isArray(dataRows) &&
        dataRows.map((row) => (
          <Card sx={{ maxWidth: 345 }} key={row.id}>
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
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.description ? row.description : defaultDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
}

export default BooskPage