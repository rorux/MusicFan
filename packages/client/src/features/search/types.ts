export type AlbumsResponse = {
  pagination: AlbumsPagination;
  results: Album[];
};

export type AlbumsPagination = {
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
  master_id: number;
  master_url: string;
  uri: string;
  title: string;
  thumb: string;
  cover_image: string;
};

export type SearchState = {
  albums: Album[];
  pagination: AlbumsPagination | null;
  loading: boolean;
  error: string | null | undefined;
};
