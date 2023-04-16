import { ArtistDetails, Track } from '@features/album';

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
  artist: ArtistDetails | null;
};

export type FavouritesState = {
  favourites: Favourite[];
  loading: boolean;
  error: string | null | undefined;
};
