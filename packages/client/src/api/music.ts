export default {
  artist: (search: string): string =>
    `/database/search?q=${search}&type=artist&token=${import.meta.env.VITE_MUSIC_API_TOKEN}`,
  albums: (artist: string): string => `/database/search?artist=${artist}&token=${import.meta.env.VITE_MUSIC_API_TOKEN}`,
};
