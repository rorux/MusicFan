import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@store';
import { Album } from '@features/albums';
import {
  addFavourite,
  cleanFavouritesError,
  removeFavourite,
  selectFavouritesAlbumIdsList,
} from '@features/favourites';
import { cleanAuthState } from '@features/auth';
import { Heart, AlbumHeader } from '@components';

export const useHeader = (album: Album): ((onClick?: () => void) => React.ReactElement) => {
  const dispatch = useAppDispatch();
  const { error: favouritesError } = useAppSelector((state) => state.favourites);
  const { error: authError } = useAppSelector((state) => state.auth);
  const favouritesAlbumIdsList: number[] = useAppSelector(selectFavouritesAlbumIdsList);
  const isFavourite = favouritesAlbumIdsList.includes(album.id);

  const onClickHeart = () => {
    if (isFavourite) dispatch(removeFavourite(album.id));
    else dispatch(addFavourite(album));
  };

  if (favouritesError) {
    toast.error(favouritesError);
    dispatch(cleanFavouritesError());
  }

  if (authError) {
    dispatch(cleanAuthState());
  }

  return (onClick?: () => void) => (
    <AlbumHeader
      title={album.title}
      year={album.year}
      button={<Heart onClick={onClickHeart} isActive={isFavourite} />}
      onClickTitle={onClick}
    />
  );
};
