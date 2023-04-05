import { AnyAction, createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@store';
import { $axios_music } from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { Album, Artist, MusicResponse, SearchState } from './types';

export const findAlbumsByArtist = createAsyncThunk<MusicResponse<Album>, string, { rejectValue: string }>(
  '@@search/albums',
  async function (artist, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<MusicResponse<Album>>(api.music.albums(artist));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

export const findArtist = createAsyncThunk<MusicResponse<Artist>, string, { rejectValue: string }>(
  '@@search/artists',
  async function (search, { rejectWithValue }) {
    try {
      const response = await $axios_music.get<MusicResponse<Artist>>(api.music.artist(search));
      return response.data;
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
  pagination: null,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: '@@search',
  initialState,
  reducers: {},
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
      .addCase(findArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findArtist.fulfilled, (state, action) => {
        state.artists = action.payload.results;
        state.pagination = action.payload.pagination;
        state.loading = false;
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

// const albums = (state: RootState) => state.search.albums;
// export const selectUniqueArtistsFromAlbums = createSelector([albums], (albums): Artist[] => {
//   const artists =
//     albums.map(({ artistId, artistName, artistViewUrl }) => ({
//       artistId,
//       artistName,
//       artistViewUrl,
//     })) ?? [];
//   const uniqueArtists = artists.length ? [...new Map(artists.map((artist) => [artist.artistId, artist])).values()] : [];
//   return uniqueArtists;
// });
