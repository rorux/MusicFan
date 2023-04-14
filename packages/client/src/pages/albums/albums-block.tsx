import { PaginationBlock } from '@features/pagination';
import { AlbumsItem } from './albums-item';
import { AlbumsBlockProps } from './types';

export const AlbumsBlock = ({ albums, loading, pagination }: AlbumsBlockProps): React.ReactElement => {
  return (
    <>
      <div className="row px-3 px-sm-0">
        {albums.map((album) => (
          <AlbumsItem key={album.id} album={album} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <PaginationBlock loading={loading} pagination={pagination} />
      </div>
    </>
  );
};
