import { uniqueId } from 'lodash';
import { FavouritesItem } from './favourites-item';
import { FavouritesBlockProps } from './types';

export const FavouritesBlock = ({ favourites }: FavouritesBlockProps): React.ReactElement => {
  const artists = Object.values(favourites);

  return (
    <div className="pb-2">
      {artists.map((artist) => (
        <FavouritesItem key={uniqueId('artist_')} artist={artist} />
      ))}
    </div>
  );
};
