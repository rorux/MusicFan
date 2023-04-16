import { Album } from '@features/albums';
import { Pagination } from '@features/pagination';

export type AlbumsBlockProps = {
  albums: Album[];
  loading: boolean;
  pagination: Pagination | null;
};
