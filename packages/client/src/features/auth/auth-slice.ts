import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import $axios from '@http';
import { i18n } from '@resources';
import { api, API_URL } from '@api';
import { User, UserAndTokens, AuthState, CreateUser, FindUser } from './types';

export const register = createAsyncThunk<User, CreateUser, { rejectValue: string }>(
  '@@auth/signup',
  async function (createUser, { rejectWithValue }) {
    try {
      const response = await $axios.post<UserAndTokens>(api.auth.signup, createUser);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

export const authorize = createAsyncThunk<User, FindUser, { rejectValue: string }>(
  '@@auth/signin',
  async function (findUser, { rejectWithValue }) {
    try {
      const response = await $axios.post<UserAndTokens>(api.auth.signin, findUser);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

export const checkAuth = createAsyncThunk<User, undefined, { rejectValue: string }>(
  '@@auth/check-auth',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get<UserAndTokens>(API_URL + api.auth.refresh, {
        withCredentials: true,
        headers: { lang: localStorage.getItem('i18nextLng') ?? 'ru' },
      });
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

export const logout = createAsyncThunk<User, undefined, { rejectValue: string }>(
  '@@auth/logout',
  async function (_, { rejectWithValue }) {
    try {
      const response = await $axios.get(api.auth.logout);
      localStorage.removeItem('token');
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else return rejectWithValue(i18n.t('error.unknown'));
    }
  },
);

const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(authorize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuth = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { cleanAuthState } = authSlice.actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
