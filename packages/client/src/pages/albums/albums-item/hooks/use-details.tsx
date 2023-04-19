import { useTranslation } from 'react-i18next';
import { Album } from '@features/albums';
import { Favourite } from '@features/favourites';
import { AlbumDetails } from '@components';

export const useDetails = (album: Album | Favourite): React.ReactElement => {
  const { t } = useTranslation();
  const country = album.country ?? t('not-specified');
  const styles = album.style.length > 0 ? album.style.join(', ') : t('not-specified');
  const formats = album.format.length > 0 ? album.format.join(', ') : t('not-specified');

  return (
    <AlbumDetails
      country={country}
      styles={styles}
      formats={formats}
      countryLabel={t('albums-page.country')}
      styleLabel={t('albums-page.style')}
      formatLabel={t('albums-page.format')}
    />
  );
};
