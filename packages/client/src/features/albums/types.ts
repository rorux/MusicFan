import { Pagination } from '@features/pagination';

export type PaginationRequest = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortOrder?: string;
};

export type Album = {
  id: number;
  country: string;
  year: string;
  format: string[];
  genre: string[];
  style: string[];
  masterId: number;
  masterUrl: string | null;
  uri: string;
  title: string;
  thumb: string;
  coverImage: string;
};

export type FindAlbums = {
  artist: string;
} & PaginationRequest;

export type AlbumsState = {
  data: Album[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null | undefined;
};
