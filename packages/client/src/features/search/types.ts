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
  master_id: number | null;
  master_url: string | null;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
};

export type Track = {
  position: string;
  type_: string;
  title: string;
  duration?: string;
};

export type Video = {
  uri: string;
  title: string;
  description: string;
  duration: number;
  embed: boolean;
};

export type AlbumFullInfo = {
  id: number;
  title: string;
  artists: Array<{
    name: string;
    id: number;
    resource_url: string;
  }>;
  styles: Array<string>;
  tracklist: Array<Track>;
  videos: Array<Video>;
  year: number;
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
  album: AlbumFullInfo | null;
  pagination: Pagination | null;
  loading: boolean;
  albumLoading: boolean;
  error: string | null | undefined;
};

export type FindAlbums = {
  artist: string;
} & PaginationRequest;
