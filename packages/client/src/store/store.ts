import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@features/auth';
import { themeReducer } from '@features/theme';
import { searchReducer } from '@features/search';
import { favouritesReducer } from '@features/favourites';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    search: searchReducer,
    favourites: favouritesReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
