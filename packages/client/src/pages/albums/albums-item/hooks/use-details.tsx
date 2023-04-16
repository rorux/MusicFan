import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { kebab } from '@bem';
import { ClassNameFormatter } from '@bem-react/classname';
import { Album } from '@features/albums';

export const useDetails = (album: Album, block: ClassNameFormatter): JSX.Element => {
  const { t } = useTranslation();
  const country = album.country ?? t('not-specified');
  const styles = album.style.length > 0 ? album.style.join(', ') : t('not-specified');
  const formats = album.format.length > 0 ? album.format.join(', ') : t('not-specified');

  return useMemo(
    () => (
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
    ),
    [country, styles, formats, t],
  );
};
