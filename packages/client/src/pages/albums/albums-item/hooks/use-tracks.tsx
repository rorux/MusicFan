import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { uniqueId } from 'lodash';
import { kebab } from '@bem';
import { ClassNameFormatter } from '@bem-react/classname';
import { useAppDispatch, useAppSelector } from '@store';
import { cleanAlbumError } from '@features/album';

export const useTracks = (block: ClassNameFormatter): { loading: boolean; tracks: JSX.Element } => {
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
    tracks: useMemo(() => {
      return tracklist.length > 0 ? (
        <div className={kebab(block('tracklist-wrapper'))}>
          <div className={kebab(block('tracklist-label', ['ps-3 mb-2']))}>{t('albums-page.tracklist-label')}</div>
          <ol className={kebab(block('tracklist'))}>
            {tracklist.map((track) => (
              <li key={uniqueId('track_')}>
                {track.title} {track.duration ? `(${track.duration})` : ''}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="text-center">{t('albums-page.tracklist-empty')}</p>
      );
    }, [tracklist, t]),
  };
};
