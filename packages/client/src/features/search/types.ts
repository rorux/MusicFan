export type MusicResponse<T> = {
  pagination: Pagination;
  results: T[];
};

export type Pagination = {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
};

export type Album = {
  id: number;
  country: string;
  year: string;
  genre: string[];
  style: string[];
  master_id: number | null;
  master_url: string | null;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
};

export type Artist = {
  id: number;
  type: 'artist';
  master_id: number | null;
  master_url: string | null;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
};

export type SearchState = {
  artists: Artist[];
  albums: Album[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null | undefined;
};
