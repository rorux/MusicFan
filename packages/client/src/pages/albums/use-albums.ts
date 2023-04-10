import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@store';
import { Album, findAlbumsByArtist } from '@features/search';

export const useAlbums = (artist: string): { loading: boolean; albums: Album[] } => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { error, loading, albums } = useAppSelector((state) => state.search);

  const page = searchParams.get('page') !== null ? parseInt(searchParams.get('page') as string, 10) : undefined;
  const perPage =
    searchParams.get('per_page') !== null ? parseInt(searchParams.get('per_page') as string, 10) : undefined;

  useEffect(() => {
    dispatch(findAlbumsByArtist({ artist: artist ?? '', page, perPage }));
  }, [searchParams]);

  if (error) {
    toast.error(error);
  }

  return { loading, albums };
};
