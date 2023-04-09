import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@store';
import { Album, findAlbumsByArtist } from '@features/search';

export const useAlbums = (artist: string): { loading: boolean; albums: Album[] } => {
  const dispatch = useAppDispatch();
  const { error, loading, albums } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(findAlbumsByArtist(artist ?? ''));
  }, []);

  if (error) {
    toast.error(error);
  }

  return { loading, albums };
};
