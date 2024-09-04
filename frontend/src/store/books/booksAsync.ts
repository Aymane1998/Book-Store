import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks } from "./booksAPI";




export const getBooksAsync = createAsyncThunk(
  'books/getBooks',
  async () => {
    const response = await getBooks();

    return response;
  }
);