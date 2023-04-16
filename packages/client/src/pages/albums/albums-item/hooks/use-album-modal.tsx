import { useState } from 'react';
import { useAppDispatch } from '@store';
import { Album } from '@features/albums';
import { cleanAlbum, getAlbumDetails } from '@features/album';

export const useAlbumModal = (
  album: Album,
): {
  isOpenAlbumModal: boolean;
  setOpenAlbumModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onClickTitle: () => void;
} => {
  const [isOpenAlbumModal, setOpenAlbumModal] = useState(false);
  const dispatch = useAppDispatch();

  const onClickTitle = () => {
    setOpenAlbumModal(true);
    if (album.masterUrl) {
      dispatch(getAlbumDetails(album.masterUrl));
    } else dispatch(cleanAlbum());
  };

  return {
    isOpenAlbumModal,
    setOpenAlbumModal,
    onClickTitle,
  };
};
