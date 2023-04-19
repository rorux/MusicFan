import { cn, kebab } from '@bem';
import { AlbumHeaderProps } from './types';

const block = cn('album-header');

export const AlbumHeader = ({ title, year, button, onClickTitle }: AlbumHeaderProps) => {
  const albumYear = year ? ` (${year})` : '';
  const titleWithYear = `${title}${albumYear}`;

  return (
    <div className={kebab(block(undefined, ['d-flex']))}>
      <div className={kebab(block('title', { link: !!onClickTitle }, ['me-3 flex-grow-1']))} onClick={onClickTitle}>
        {titleWithYear}
      </div>
      <div className={kebab(block('btn-wrapper'))}>{button}</div>
    </div>
  );
};
