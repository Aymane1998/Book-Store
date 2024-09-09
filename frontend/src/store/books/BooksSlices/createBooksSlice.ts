import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../utils/types/Book";
import { ApiDataResponse } from "../../../utils/types/redux";
import { ReduxStatus } from "../../../utils/types/reduxStatusValues";
import { createSnackbar } from "../../../Providers/CSnackbarProvider";
import { createBooksAsync } from "../booksAsync";

const initialState: ApiDataResponse<Book | null> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: null,
};

const createBooksSlice = createSlice({
  name: 'createBooks',
  initialState,
  reducers: {
    resetCreateBooksRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooksAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(createBooksAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'createBooks successful';
        state.data = action.payload;
        createSnackbar({
          message: "Book is added with success.",
          variant: 'success',
        });
      })
      .addCase(createBooksAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'createBooks failed';
        createSnackbar({
          message: "A proble has occured, please try again",
          variant: 'error',
        });
      });
  },
});

export const { resetCreateBooksRequest } = createBooksSlice.actions;

export default createBooksSlice.reducer;
