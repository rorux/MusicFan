export type MusicResponse<T> = {
  pagination: Pagination;
  results: T[];
};

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

export type Track = {
  position: string;
  type: string;
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
    resourceUrl: string;
  }>;
  styles: Array<string>;
  tracklist: Array<Track>;
  videos: Array<Video>;
  year: number;
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
