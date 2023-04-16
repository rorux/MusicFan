import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $axios, { $axios_music } from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { Album } from '@features/albums';
import { AlbumDetails } from '@features/album';
import { Favourite, FavouritesState } from './types';

export const addFavourite = createAsyncThunk<Favourite, Album, { rejectValue: string }>(
  '@@favourites/add',
  async function (album, { rejectWithValue }) {
    try {
      const { masterId, title, year, country, style, format, coverImage } = album;
      const albumDetailsResponse = album.masterUrl ? await $axios_music.get<AlbumDetails>(album.masterUrl) : null;
      const artist = albumDetailsResponse?.data.artists[0] ?? null;
      const tracklistRawData = albumDetailsResponse?.data.tracklist ?? [];
      const tracklist = tracklistRawData.map((track) => ({
        position: track.position,
        type: track.type,
        title: track.title,
        duration: track.duration ?? null,
      }));

      const newFavourite = {
        albumId: masterId,
        artist: artist ? { id: artist.id, name: artist.name, resourceUrl: artist.resourceUrl } : null,
        title,
        year,
        country,
        style,
        format,
        coverImage,
        tracklist,
      };

      const response = await $axios.post<Favourite>(api.favourites.add, newFavourite);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
  error: null,
};

const favouritesSlice = createSlice({
  name: '@@favourites',
  initialState,
  reducers: {
    cleanFavouritesError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.favourites = [...state.favourites, action.payload];
        state.loading = false;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const favouritesReducer = favouritesSlice.reducer;
export const { cleanFavouritesError } = favouritesSlice.actions;
