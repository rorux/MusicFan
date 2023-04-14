export type Pagination = {
  page: number;
  pages: number;
  perPage: number;
  items: number;
  urls: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
};

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
