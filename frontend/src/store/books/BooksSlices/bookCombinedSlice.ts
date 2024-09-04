import { combineReducers } from "@reduxjs/toolkit";
import getBookSlice from "./getBookSlice";



const bookReducer = combineReducers({
  // Book
  getBooks: getBookSlice,
});

export default bookReducer;