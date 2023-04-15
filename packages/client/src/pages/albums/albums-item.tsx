import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import { cn, kebab } from '@bem';
import { useAppDispatch, useAppSelector } from '@store';
import { getAlbumDetails, cleanAlbum, cleanAlbumError } from '@features/album';
import { addFavourite, cleanFavouritesError } from '@features/favourites';
import { Heart, Modal, Spinner } from '@components';
import { AlbumsItemProps } from './types';

const block = cn('albums-item');

export const AlbumsItem = ({ album }: AlbumsItemProps): React.ReactElement => {
  const [isOpenAlbumModal, setOpenAlbumModal] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { loading, data: albumDetails, error: albumError } = useAppSelector((state) => state.album);
  const { error: favouriteError } = useAppSelector((state) => state.favourites);

  const year = album.year ? ` (${album.year})` : '';
  const titleWithYear = `${album.title}${year}`;

  const country = album.country ?? t('not-specified');
  const styles = album.style.length > 0 ? album.style.join(', ') : t('not-specified');
  const formats = album.format.length > 0 ? album.format.join(', ') : t('not-specified');

  const tracklist = albumDetails?.tracklist ?? [];

  const getAlbum = async (url: string | null) => {
    if (url) {
      dispatch(getAlbumDetails(url));
    } else dispatch(cleanAlbum());
  };

  const onClickTitle = () => {
    setOpenAlbumModal(true);
    getAlbum(album.masterUrl);
  };

  const onClickHeart = async () => {
    await getAlbum(album.masterUrl);
    const { masterId, title, year, country, style, format, coverImage } = album;
    const artist = albumDetails?.artists[0] ?? null;
    await dispatch(
      addFavourite({
        albumId: masterId,
        artist: artist ? { id: artist.id, name: artist.name, resourceUrl: artist.resourceUrl } : null,
        title,
        year,
        country,
        style,
        format,
        coverImage,
        tracklist: albumDetails?.tracklist ?? [],
      }),
    );
  };

  const header = (onClick?: () => void): JSX.Element => (
    <div className="d-flex">
      <div className={kebab(block('title', { link: !!onClick }, ['me-3 flex-grow-1']))} onClick={onClick}>
        {titleWithYear}
      </div>
      <div className={kebab(block('heart-wrapper'))}>
        <Heart onClick={onClickHeart} />
      </div>
    </div>
  );

  const cover = (
    <div className={kebab(block('picture', ['mb-3']))}>
      <img src={album.coverImage} alt={album.title} className="w-100" />
    </div>
  );

  const details = (
    <>
      <div className={kebab(block('detail'))}>
        <small>
          <span className={kebab(block('detail-label'))}>{t('albums-page.country')}</span> – {country}
        </small>
      </div>
      <div className={kebab(block('detail'))}>
        <small>
          <span className={kebab(block('detail-label'))}>{t('albums-page.style')}</span> – {styles}
        </small>
      </div>
      <div className={kebab(block('detail'))}>
        <small>
          <span className={kebab(block('detail-label'))}>{t('albums-page.format')}</span> – {formats}
        </small>
      </div>
    </>
  );

  const tracks =
    tracklist.length > 0 ? (
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

  if (albumError) {
    toast.error(albumError);
    dispatch(cleanAlbumError());
  }

  if (favouriteError) {
    toast.error(favouriteError);
    dispatch(cleanFavouritesError());
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 px-2 pb-3">
      <div className={kebab(block(undefined, ['card px-4 py-3 h-100 rounded-0']))}>
        <div className="mb-3">{header(onClickTitle)}</div>
        {cover}
        {details}
      </div>
      <Modal isOpen={isOpenAlbumModal} setOpen={setOpenAlbumModal} title={loading ? <Spinner /> : header()}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row mb-3">
              <div className="col-6">{cover}</div>
              <div className="col-6">{details}</div>
            </div>
            {tracks}
          </>
        )}
      </Modal>
    </div>
  );
};
