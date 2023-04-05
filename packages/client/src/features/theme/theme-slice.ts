import { createSlice } from '@reduxjs/toolkit';

type ThemeState = 'dark' | 'light';
const initialState: ThemeState = (localStorage.getItem('theme') as ThemeState) ?? 'dark';

const themeSlice = createSlice({
  name: '@@theme',
  initialState,
  reducers: {
    setTheme: (_, action) => {
      localStorage.setItem('theme', action.payload);
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
