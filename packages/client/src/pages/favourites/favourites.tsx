import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@router';
import { useAppSelector } from '@store';
import { Header } from '@widgets/header';
import { Spinner } from '@components';
import { useFavouritesList } from './use-favourites-list';

export const FavouritesPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loading, sortedFavourites } = useFavouritesList();
  const hasFavourites = JSON.stringify(sortedFavourites) !== '{}';

  if (!isAuth) {
    return <Navigate to={ROUTES.SIGNIN} />;
  }

  const noFavourites = (
    <>
      <p className="text-center">{t('favourites-page.empty-list')}</p>
      <p className="text-center">
        <Link to={ROUTES.MAIN}>{t('favourites-page.back-to-search')}</Link>
      </p>
    </>
  );

  return (
    <>
      <Header />
      <div className="container content-wrapper">
        <h2 className="text-center px-5 mt-2 mt-md-5 mb-3 mb-md-5">{t('favourites-page.title')}</h2>
        {loading ? <Spinner /> : hasFavourites ? <div>Favourites</div> : noFavourites}
      </div>
    </>
  );
};
