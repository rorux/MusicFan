import { toast } from 'react-toastify';
import { kebab } from '@bem';
import { ClassNameFormatter } from '@bem-react/classname';
import { useAppDispatch, useAppSelector } from '@store';
import { Album } from '@features/albums';
import {
  addFavourite,
  cleanFavouritesError,
  removeFavourite,
  selectFavouritesAlbumIdsList,
} from '@features/favourites';
import { Heart, AlbumHeader } from '@components';

export const useHeader = (album: Album): ((onClick?: () => void) => React.ReactElement) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.favourites);
  const favouritesAlbumIdsList: number[] = useAppSelector(selectFavouritesAlbumIdsList);
  const isFavourite = favouritesAlbumIdsList.includes(album.id);

  const onClickHeart = () => {
    if (isFavourite) dispatch(removeFavourite(album.id));
    else dispatch(addFavourite(album));
  };

  if (error) {
    toast.error(error);
    dispatch(cleanFavouritesError());
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
