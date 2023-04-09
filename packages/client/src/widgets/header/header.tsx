import { useLocation } from 'react-router-dom';
import { cn, kebab } from '@bem';
import { useAppSelector } from '@store';
import { ThemeSwitcher } from '@features/theme';
import { LangSwitcher } from '@features/lang';
import { LogoutBtn } from '@features/logout';
import { LoginBtn } from '@features/login';
import { ROUTES } from '@router';
import { Logo } from './logo';

const block = cn('header-block');

export const Header = (): React.ReactElement => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isAuthPage = location.pathname === ROUTES.SIGNUP || location.pathname === ROUTES.SIGNIN;

  return (
    <div className={kebab(block(undefined, ['position-fixed w-100']))}>
      <ul className={kebab(block('list', ['nav container pe-0']))}>
        <li className={kebab(block('item', ['nav-item']))}>
          <Logo />
        </li>
        <li className="flex-grow-1"></li>
        <li className={kebab(block('item', ['nav-item']))}>
          <ThemeSwitcher />
        </li>
        <li className={kebab(block('item', ['nav-item']))}>
          <LangSwitcher />
        </li>
        {isAuth && (
          <li className={kebab(block('item', ['nav-item']))}>
            <LogoutBtn />
          </li>
        )}
        {!isAuth && !isAuthPage && (
          <li className={kebab(block('item', ['nav-item']))}>
            <LoginBtn />
          </li>
        )}
      </ul>
    </div>
  );
};
