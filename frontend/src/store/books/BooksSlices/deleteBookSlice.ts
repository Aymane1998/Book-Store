import { createSlice } from '@reduxjs/toolkit';
import { deleteBookAsync } from '../booksAsync';
import { ReduxStatus } from '../../../utils/types/reduxStatusValues';
import { ApiResponse } from '../../../utils/types/redux';

const initialState: ApiResponse = {
  status: ReduxStatus.Idle,
  error: null,
  alert: {
    successMessage: '',
    errorMessage: '',
  },
};

const deleteBookSlice = createSlice({
  name: 'deleteBook',
  initialState,
  reducers: {
    resetDeleteBookRequest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBookAsync.pending, (state: { status: string }) => {
        state.status = ReduxStatus.Loading;
      })
      .addCase(deleteBookAsync.fulfilled, (state) => {
        state.status = ReduxStatus.Succeeded;
        state.alert.successMessage = 'deleteBook successful';
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.status = ReduxStatus.Failed;
        state.error = action.error.message;
        state.alert.errorMessage = 'deleteBook failed';
      });
  },
});

export const { resetDeleteBookRequest } = deleteBookSlice.actions;

export default deleteBookSlice.reducer;
