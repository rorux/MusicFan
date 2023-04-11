import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn, kebab } from '@bem';
import { Heart } from '@components/heart';
import { AlbumsItemProps } from './types';
import { Modal } from '@components/modal';

const block = cn('albums-item');

export const AlbumsItem = ({ album }: AlbumsItemProps): React.ReactElement => {
  const [isOpenAlbumModal, setOpenAlbumModal] = useState(false);
  const { t } = useTranslation();

  const year = album.year ? ` (${album.year})` : undefined;
  const country = album.country ?? t('not-specified');
  const styles = album.style.length > 0 ? album.style.join(', ') : t('not-specified');
  const formats = album.format.length > 0 ? album.format.join(', ') : t('not-specified');

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 px-2 pb-3">
      <div className={kebab(block(undefined, ['card px-4 py-3 h-100 rounded-0']))}>
        <div className="d-flex">
          <div className={kebab(block('title', ['mb-2 me-2']))} onClick={() => setOpenAlbumModal(true)}>
            {album.title}
            {year}
          </div>
          <div className={kebab(block('heart-wrapper'))}>
            <Heart onClick={() => console.log('albumId', album.id)} />
          </div>
        </div>
        <div className={kebab(block('picture', ['mb-2']))}>
          <img src={album.cover_image} alt={album.title} className="w-100" />
        </div>
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
      </div>
      <Modal isOpen={isOpenAlbumModal} setOpen={setOpenAlbumModal} />
    </div>
  );
};
