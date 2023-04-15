import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $axios from '@http';
import { i18n } from '@resources';
import { api } from '@api';
import { AddFavourite, Favourite, FavouritesState } from './types';

export const addFavourite = createAsyncThunk<Favourite, AddFavourite, { rejectValue: string }>(
  '@@favourites/add',
  async function (newFavourite, { rejectWithValue }) {
    try {
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
