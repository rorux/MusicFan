import axios from 'axios';
import { UserAndTokens } from '@features';
import { API_URL, api } from '@api';

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<UserAndTokens>(`${API_URL}${api.auth.refresh}`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return $axios.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export default $axios;
