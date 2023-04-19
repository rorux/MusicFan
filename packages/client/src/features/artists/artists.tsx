import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { cn, kebab } from '@bem';
import { useClickOutside } from '@hooks';
import { findArtist } from '@features/artists';
import { useAppDispatch, useAppSelector } from '@store';
import { ROUTES } from '@router';
import { Button, Input, Spinner } from '@components';
import { useDebounce } from './use-debounce';

const namespace = 'artists';
const block = cn(namespace);
const dropdownBlock = cn('dropdown');

export const Artists = (): React.ReactElement => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const debounced = useDebounce(search);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdown(false));

  const { error, loading, data } = useAppSelector((state) => state.artists);

  const getArtist = () => {
    if (debounced.length > 2) {
      dispatch(findArtist(debounced));
      setDropdown(true);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) return navigate(`${ROUTES.ALBUMS}/${search}`);
  };

  useEffect(() => {
    if (debounced.length === 0) {
      setDropdown(false);
    }
    getArtist();
  }, [debounced, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <h2 className="text-center mt-2 mt-md-5 mb-3 mb-md-5">{t(`${namespace}.title`)}</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col col-lg-9 mx-auto">
            <div className="row">
              <div className="col-md-9 mb-2 mb-md-0">
                <Input
                  type="text"
                  name="search-band"
                  value={search}
                  onChange={onChange}
                  placeholder={t(`${namespace}.artist-name-label`)}
                  className={kebab(block('input'))}
                  onFocus={getArtist}
                />
              </div>
              <div className="col-md-3">
                <Button label={t('find')} className={kebab(block('submit-btn'))} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col col-md-9">
                {loading ? (
                  <Spinner />
                ) : !!data.length && dropdown ? (
                  <ul
                    ref={dropdownRef}
                    className={kebab(dropdownBlock(undefined, ['list-group rounded-0 overflow-auto']))}
                  >
                    {data.map((artist) => (
                      <Link key={artist.id} to={`${ROUTES.ALBUMS}/${artist.title}`}>
                        <li className={kebab(dropdownBlock('item', ['list-group-item d-flex']))}>
                          <span className={kebab(dropdownBlock('artist-label'))}>{artist.title}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                ) : undefined}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
