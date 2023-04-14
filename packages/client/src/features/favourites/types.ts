import { Track } from '@features/search';

export type Favourite = {
  id: number;
  userId: number;
  albumId: number;
  title: string;
  year: string;
  country: string;
  style: string[];
  format: string[];
  coverImage: string;
  tracklist: Track[];
};

export type AddFavourite = Omit<Favourite, 'id' | 'userId'>;

export type FavouritesState = {
  favourites: Favourite[];
  loading: boolean;
  error: string | null | undefined;
};
