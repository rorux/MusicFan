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
import { Heart } from '@components';

export const useHeader = (album: Album, block: ClassNameFormatter): ((onClick?: () => void) => JSX.Element) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.favourites);
  const favouritesAlbumIdsList: number[] = useAppSelector(selectFavouritesAlbumIdsList);
  const isFavourite = favouritesAlbumIdsList.includes(album.id);
  const year = album.year ? ` (${album.year})` : '';
  const titleWithYear = `${album.title}${year}`;

  const onClickHeart = () => {
    if (isFavourite) dispatch(removeFavourite(album.id));
    else dispatch(addFavourite(album));
  };

  if (error) {
    toast.error(error);
    dispatch(cleanFavouritesError());
  }

  const header = (onClick?: () => void): JSX.Element => (
    <div className="d-flex">
      <div className={kebab(block('title', { link: !!onClick }, ['me-3 flex-grow-1']))} onClick={onClick}>
        {titleWithYear}
      </div>
      <div className={kebab(block('heart-wrapper'))}>
        <Heart onClick={onClickHeart} isActive={isFavourite} />
      </div>
    </div>
  );

  return header;
};
