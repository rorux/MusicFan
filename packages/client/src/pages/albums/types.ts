import { Album } from '@features/search';
import { Pagination } from '@features/pagination';

export type AlbumsBlockProps = {
  albums: Album[];
  loading: boolean;
  pagination: Pagination | null;
};

export type AlbumsItemProps = {
  album: Album;
};
