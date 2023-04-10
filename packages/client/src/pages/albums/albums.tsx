import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@widgets/header';
import { Spinner } from '@components/spinner';
import { ROUTES } from '@router';
import { BackBtn } from '@components/back-btn';
import { AlbumsBlock } from './albums-block';
import { useAlbums } from './use-albums';

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
        <h2 className="position-relative text-center px-5 mt-2 mt-md-5 mb-3 mb-md-5">
          <span className="position-absolute" style={{ left: 0 }}>
            <BackBtn route={ROUTES.MAIN} />
          </span>
          {artist}
        </h2>
        {loading ? <Spinner /> : albums.length > 0 ? <AlbumsBlock albums={albums} /> : noAlbums}
      </div>
    </>
  );
};
