import { useMemo } from 'react';
import { kebab } from '@bem';
import { ClassNameFormatter } from '@bem-react/classname';
import { Album } from '@features/albums';

export const useCover = (album: Album, block: ClassNameFormatter): JSX.Element => {
  return useMemo(
    () => (
      <div className={kebab(block('picture', ['mb-3']))}>
        <img src={album.coverImage} alt={album.title} className="w-100" />
      </div>
    ),
    [album],
  );
};
