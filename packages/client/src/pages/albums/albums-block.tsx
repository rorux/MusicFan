import { AlbumsItem } from './albums-item';
import { AlbumsBlockProps } from './types';

export const AlbumsBlock = ({ albums }: AlbumsBlockProps): React.ReactElement => {
  return (
    <div className="row px-3 px-sm-0">
      {albums.map((album) => (
        <AlbumsItem key={album.id} album={album} />
      ))}
    </div>
  );
};
