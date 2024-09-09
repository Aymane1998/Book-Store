import { combineReducers } from "@reduxjs/toolkit";
import getBookSlice from "./getBookSlice";
import createBooksSlice from "./createBooksSlice";



const bookReducer = combineReducers({
  // Book
  getBooks: getBookSlice,
  createBooks: createBooksSlice
});

export default bookReducer;