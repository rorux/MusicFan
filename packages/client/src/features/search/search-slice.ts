import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { $axios_music } from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { toCamelCase } from '@utils';
import { Album, AlbumFullInfo, Artist, FindAlbums, MusicResponse, SearchState } from './types';

export const findAlbumsByArtist = createAsyncThunk<MusicResponse<Album>, FindAlbums, { rejectValue: string }>(
  '@@search/albums',
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

export const getAlbumFullInfo = createAsyncThunk<AlbumFullInfo, string, { rejectValue: string }>(
  '@@search/album',
  async function (url, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<AlbumFullInfo>(url);
      return toCamelCase(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: SearchState = {
  artists: [],
  albums: [],
  album: null,
  pagination: null,
  loading: false,
  albumLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: '@@search',
  initialState,
  reducers: {
    cleanAlbum: (state) => ({
      ...state,
      album: null,
    }),
    cleanError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAlbumsByArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findAlbumsByArtist.fulfilled, (state, action) => {
        state.albums = action.payload.results;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getAlbumFullInfo.pending, (state) => {
        state.albumLoading = true;
        state.error = null;
      })
      .addCase(getAlbumFullInfo.fulfilled, (state, action) => {
        state.album = action.payload;
        state.albumLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const searchReducer = searchSlice.reducer;
export const { cleanAlbum, cleanError } = searchSlice.actions;
