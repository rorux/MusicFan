import { useTranslation } from 'react-i18next';
import { cn, kebab } from '@bem';
import { Header } from '@widgets/header';
import { Input } from '@components/input';
import { Button } from '@components/button';

const block = cn('main-page');
const namespace = 'main-page';

export const MainPage = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="container content-wrapper">
        <h2 className="text-center my-5">{t(`${namespace}.search-title`)}</h2>
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-6">
            <div className="row">
              <div className="col-9">
                <Input
                  type="text"
                  name="search-band"
                  placeholder={t(`${namespace}.name-artist-label`)}
                  className={kebab(block('search-input'))}
                />
              </div>
              <div className="col-3">
                <Button label={t('find')} className={kebab(block('search-btn'))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
