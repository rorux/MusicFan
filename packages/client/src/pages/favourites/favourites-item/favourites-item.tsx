import { useTranslation } from 'react-i18next';
import { FavouritesItemAlbums } from './favourites-item-albums';
import { FavouritesItemProps } from './types';

export const FavouritesItem = ({ artist }: FavouritesItemProps): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="mb-3 px-3 px-sm-0">{artist.artist ?? t('favourites-page.artist-not-specified')}</h3>
      <div className="row px-3 px-sm-0 mb-5">
        {artist.data.map((album) => (
          <FavouritesItemAlbums key={album.id} album={album} />
        ))}
      </div>
    </>
  );
};
