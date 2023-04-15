import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { $axios_music } from '@http';
import { i18n } from '@resources';
import { toCamelCase } from '@utils';
import { AlbumDetails, AlbumState } from './types';

export const getAlbumDetails = createAsyncThunk<AlbumDetails, string, { rejectValue: string }>(
  '@@album/details',
  async function (url, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<AlbumDetails>(url);
      return toCamelCase(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: AlbumState = {
  data: null,
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: '@@album',
  initialState,
  reducers: {
    cleanAlbum: (state) => ({
      ...state,
      data: null,
    }),
    cleanAlbumError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlbumDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAlbumDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const albumReducer = albumSlice.reducer;
export const { cleanAlbum, cleanAlbumError } = albumSlice.actions;
