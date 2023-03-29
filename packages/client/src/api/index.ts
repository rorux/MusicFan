import auth from './auth';

export const API_URL = import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_PORT;

export const api = {
  auth,
};
