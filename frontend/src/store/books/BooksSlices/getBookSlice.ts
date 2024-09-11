import { createSlice } from '@reduxjs/toolkit';
import { ApiDataResponse } from '../../../utils/types/redux';
import { Book } from '../../../utils/types/Book';
import { ReduxStatus } from '../../../utils/types/reduxStatusValues';
import { getBooksAsync } from '../booksAsync';
import { createSnackbar } from '../../../Providers/CSnackbarProvider';

const initialState: ApiDataResponse<Book[] | null> = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
  data: [],
};

const getBookSlice = createSlice({
  name: 'getBook',
  initialState,
  reducers: {
    removeItemBookList: (state, action) => {
      const id = action.payload;

      return {
        ...state,
        data: state.data.filter((item) => item._id !== id),
      };
    },
    resetGetBooksRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'getBook successful';
        state.data = action.payload;
      })
      .addCase(getBooksAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'getAttribution failed';
        createSnackbar({
          message:
            'Une erreur est survenue lors de la récupération des livres.',
          variant: 'error',
        });
      });
  },
});

export const { resetGetBooksRequest, removeItemBookList } = getBookSlice.actions;

export default getBookSlice.reducer;
