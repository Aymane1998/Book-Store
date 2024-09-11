import { combineReducers } from "@reduxjs/toolkit";
import getBookSlice from "./getBookSlice";
import createBooksSlice from "./createBooksSlice";
import deleteBookSlice from "./deleteBookSlice";



const bookReducer = combineReducers({
  // Book
  getBooks: getBookSlice,
  createBooks: createBooksSlice,
  deleteBook: deleteBookSlice
});

export default bookReducer;