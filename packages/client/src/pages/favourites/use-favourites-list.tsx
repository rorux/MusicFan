import { toast } from 'react-toastify';
import { useAppSelector } from '@store';
import { selectSortedFavourites, SortedFavourites } from '@features/favourites';

export const useFavouritesList = (): { loading: boolean; sortedFavourites: SortedFavourites } => {
  const { loading, error } = useAppSelector((state) => state.favourites);
  const sortedFavourites = useAppSelector(selectSortedFavourites);

  if (error) {
    toast.error(error);
  }

  return {
    loading,
    sortedFavourites,
  };
};
