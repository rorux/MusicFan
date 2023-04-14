import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { $axios_music } from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { toCamelCase } from '@utils';
import { MusicResponse } from '@features/artists';
import { Album, AlbumsState, FindAlbums } from './types';

export const findAlbumsByArtist = createAsyncThunk<MusicResponse<Album>, FindAlbums, { rejectValue: string }>(
  '@@albums/find',
  async function ({ artist, page, perPage, sort, sortOrder }, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<MusicResponse<Album>>(
        api.music.albums(artist, page, perPage, sort, sortOrder),
      );
      return toCamelCase(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: AlbumsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const albumsSlice = createSlice({
  name: '@@albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAlbumsByArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findAlbumsByArtist.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(findAlbumsByArtist.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
