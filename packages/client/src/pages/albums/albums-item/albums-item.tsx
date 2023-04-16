import { cn, kebab } from '@bem';
import { Modal, Spinner } from '@components';
import { useAlbumModal, useCover, useDetails, useHeader, useTracks } from './hooks';
import { AlbumsItemProps } from './types';

const block = cn('albums-item');

export const AlbumsItem = ({ album }: AlbumsItemProps): React.ReactElement => {
  const header = useHeader(album, block);
  const cover = useCover(album, block);
  const details = useDetails(album, block);
  const { isOpenAlbumModal, setOpenAlbumModal, onClickTitle } = useAlbumModal(album);
  const { loading, tracks } = useTracks(block);

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
