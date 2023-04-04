export default {
  albums: (artist: string): string => `/database/search?artist=${artist}&token=${import.meta.env.VITE_MUSIC_API_TOKEN}`,
};
