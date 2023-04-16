import { useEffect } from 'react';
import { useAppDispatch } from '@store';
import { cleanFavourites, fetchFavourites } from '@features/favourites';

export const useFavourites = (isAuth: boolean): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) dispatch(fetchFavourites());
    else dispatch(cleanFavourites());
  }, [isAuth]);
};
