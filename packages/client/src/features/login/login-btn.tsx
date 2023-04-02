import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftShort } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { ROUTES } from '@router';

const block = cn('login-btn');

export const LoginBtn = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Link to={ROUTES.SIGNIN}>
      <span className={kebab(block(undefined, ['rounded-0']))}>
        {t('login')} <BsArrowLeftShort />
      </span>
    </Link>
  );
};
