import { FavouritesItemAlbums } from './favourites-item-albums';
import { FavouritesItemProps } from './types';

export const FavouritesItem = ({ artist }: FavouritesItemProps): React.ReactElement => {
  return (
    <div className="row px-3 px-sm-0">
      {artist.data.map((album) => (
        <FavouritesItemAlbums key={album.id} album={album} />
      ))}
    </div>
  );
};
