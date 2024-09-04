import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import bookReducer from './books/BooksSlices/bookCombinedSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['notif'],
};

const rootReducer = combineReducers({
 book : bookReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const resettableRootReducer = (
  state: RootState | undefined,
  action: AnyAction
): RootState => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action) as RootState;
  }

  return rootReducer(state, action) as RootState;
};

const persistedReducer = persistReducer(persistConfig, resettableRootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // Prevent error of using none basic type in store
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
