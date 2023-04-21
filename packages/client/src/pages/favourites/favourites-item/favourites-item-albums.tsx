import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn, kebab } from '@bem';
import { useDetails } from '@pages/albums/albums-item';
import { useAppDispatch } from '@store';
import { removeFavourite } from '@features/favourites';
import { AlbumHeader, Button, CoverImage, Modal, Tracks, Trash } from '@components';
import { FavouritesItemAlbumsProps } from './types';

const block = cn('favourites-item');
const namespace = 'favourites-page';

export const FavouritesItemAlbums = ({ album }: FavouritesItemAlbumsProps): React.ReactElement => {
  const [isOpenDialogModal, setOpenDialogModal] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const details = useDetails(album);

  return (
    <div className="col-12 col-xl-6 px-2 pb-3">
      <div className={kebab(block(undefined, ['card px-4 py-3 h-100 rounded-0']))}>
        <div className="h5 mb-4">
          <AlbumHeader
            title={album.title}
            year={album.year}
            button={
              <Trash
                onClick={() => {
                  setOpenDialogModal(true);
                }}
              />
            }
          />
          <Modal title={t(`${namespace}.remove`) as string} isOpen={isOpenDialogModal} setOpen={setOpenDialogModal}>
            <div className="row">
              <div className="col-6">
                <Button
                  label={t('yes')}
                  onClick={() => {
                    dispatch(removeFavourite(album.albumId));
                    setOpenDialogModal(false);
                  }}
                />
              </div>
              <div className="col-6">
                <Button
                  label={t('no')}
                  onClick={() => {
                    setOpenDialogModal(false);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
        <div className="row">
          <div className="col-5">
            <CoverImage coverImage={album.coverImage} title={album.title} />
            {details}
          </div>
          <div className="col-7">
            <Tracks
              tracklist={album.tracklist}
              title={t('albums-page.tracklist-label')}
              emptyLabel={t('albums-page.tracklist-empty')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
