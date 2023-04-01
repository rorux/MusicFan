import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@features/auth';
import { themeReducer } from '@features/theme';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
