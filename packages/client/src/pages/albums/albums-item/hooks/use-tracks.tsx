import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store';
import { cleanAlbumError } from '@features/album';
import { Tracks } from '@components';

export const useTracks = (): { loading: boolean; tracks: JSX.Element } => {
  const { loading, data, error } = useAppSelector((state) => state.album);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tracklist = data?.tracklist ?? [];

  if (error) {
    toast.error(error);
    dispatch(cleanAlbumError());
  }

  return {
    loading,
    tracks: (
      <Tracks
        tracklist={tracklist}
        title={t('albums-page.tracklist-label')}
        emptyLabel={t('albums-page.tracklist-empty')}
      />
    ),
  };
};
