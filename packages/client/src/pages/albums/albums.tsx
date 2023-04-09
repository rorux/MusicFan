import { Link, useParams } from 'react-router-dom';
import { Header } from '@widgets/header';
import { AlbumsBlock } from '@pages/albums/albums-block';
import { Spinner } from '@components/spinner';
import { ROUTES } from '@router';
import { useAlbums } from './use-albums';
import { useTranslation } from 'react-i18next';

export const AlbumsPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const { artist } = useParams();
  const { loading, albums } = useAlbums(artist ?? '');

  const noAlbums = (
    <>
      <p className="text-center">{t('albums-page.no-albums')}</p>
      <p className="text-center">
        <Link to={ROUTES.MAIN}>{t('albums-page.back-to-search')}</Link>
      </p>
    </>
  );

  return (
    <>
      <Header />
      <div className="container content-wrapper">
        <h2 className="text-center mt-2 mt-md-5 mb-3 mb-md-5">{artist}</h2>
        {loading ? <Spinner /> : albums.length > 0 ? <AlbumsBlock albums={albums} /> : noAlbums}
      </div>
    </>
  );
};
