import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn, kebab } from '@bem';
import { Input } from '@components/input';
import { Button } from '@components/button';
import { useDebounce } from './use-debounce';

const block = cn('search');
const namespace = 'search';

export const Search = (): React.ReactElement => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const debounced = useDebounce(search);

  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h2 className="text-center my-5">{t(`${namespace}.title`)}</h2>
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-6">
          <div className="row">
            <div className="col-9">
              <Input
                type="text"
                name="search-band"
                value={search}
                onChange={onChange}
                placeholder={t(`${namespace}.artist-name-label`)}
                className={kebab(block('input'))}
              />
            </div>
            <div className="col-3">
              <Button label={t('find')} className={kebab(block('submit-btn'))} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
