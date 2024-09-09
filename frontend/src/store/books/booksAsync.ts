import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBooks, getBooks } from "./booksAPI";
import { CreateBookPayload } from "../types";




export const getBooksAsync = createAsyncThunk(
  'books/getBooks',
  async () => {
    const response = await getBooks();

    return response;
  }
);

export const createBooksAsync = createAsyncThunk(
  'books/createBooks',
  async (body: CreateBookPayload) => {
    const response = await createBooks(body);

    return response;
  }
);