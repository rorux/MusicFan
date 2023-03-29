import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@api';
import $axios from '@http';
import { User, UserAndTokens, AuthState, CreateUser } from './types';

export const register = createAsyncThunk<User, CreateUser, { rejectValue: string }>(
  '@@auth/signup',
  async function (createUser, { rejectWithValue }) {
    const response = await $axios.post<UserAndTokens>(api.auth.signup, createUser);

    if (!response.data) {
      return rejectWithValue('Server Error!');
    }

    return response.data.user;
  },
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
