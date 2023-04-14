import auth from './auth';
import music from './music';
import favourites from './favourites';

export const API_URL = import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_PORT;
export const MUSIC_API_URL = 'https://api.discogs.com';

export const api = {
  auth,
  music,
  favourites,
};
