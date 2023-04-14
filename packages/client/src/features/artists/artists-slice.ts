import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { $axios_music } from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { toCamelCase } from '@utils';
import { Artist, MusicResponse, ArtistsState } from './types';

export const findArtist = createAsyncThunk<MusicResponse<Artist>, string, { rejectValue: string }>(
  '@@artists/find',
  async function (search, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<MusicResponse<Artist>>(api.music.artist(search));
      return toCamelCase(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: ArtistsState = {
  data: [],
  loading: false,
  error: null,
};

const artistsSlice = createSlice({
  name: '@@artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findArtist.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.loading = false;
      })
      .addCase(findArtist.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
