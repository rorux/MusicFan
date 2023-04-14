import { Pagination } from '@features/pagination';

export type MusicResponse<T> = {
  pagination: Pagination;
  results: T[];
};

export type Artist = {
  id: number;
  type: 'artist';
  masterId: number | null;
  masterUrl: string | null;
  uri: string;
  title: string;
  thumb: string;
  coverImage: string;
  resourceUrl: string;
};

export type ArtistsState = {
  data: Artist[];
  loading: boolean;
  error: string | null | undefined;
};
