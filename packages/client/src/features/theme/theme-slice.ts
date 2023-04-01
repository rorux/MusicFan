import { createSlice } from '@reduxjs/toolkit';

const initialState: 'dark' | 'light' = 'dark';

const themeSlice = createSlice({
  name: '@@theme',
  initialState,
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
