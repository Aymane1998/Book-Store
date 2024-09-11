import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBooks, deleteBook, getBooks } from "./booksAPI";
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

export const deleteBookAsync = createAsyncThunk(
  'books/deleteBook',
  async (id: string) => {
    const response = await deleteBook(id);

    return response;
  }
);