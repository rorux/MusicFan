import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftShort } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { ROUTES } from '@router';

const block = cn('auth-btn');

export const LoginBtn = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Link to={ROUTES.SIGNIN}>
      <span className={kebab(block(undefined, ['rounded-0']))}>
        <span className={kebab(block('label', ['text-uppercase d-none d-sm-block']))}>
          <small>{t('login')}</small>
        </span>
        <BsArrowLeftShort />
      </span>
    </Link>
  );
};
