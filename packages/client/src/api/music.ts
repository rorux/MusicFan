import { perPageItemsCount } from '@constants';

const token = import.meta.env.VITE_MUSIC_API_TOKEN;

export default {
  artist: (search: string): string =>
    `/database/search?q=${search}&type=artist&token=${import.meta.env.VITE_MUSIC_API_TOKEN}`,
  albums: (artist: string, page = 1, perPage = perPageItemsCount, sort = 'year', sortOrder = 'asc'): string =>
    `/database/search?artist=${artist}&token=${token}&page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
};
