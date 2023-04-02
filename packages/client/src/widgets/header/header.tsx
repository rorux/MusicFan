import { useLocation } from 'react-router-dom';
import { cn, kebab } from '@bem';
import { useAppSelector } from '@store';
import { ThemeSwitcher } from '@features/theme';
import { LangSwitcher } from '@features/lang';
import { LogoutBtn } from '@features/logout';
import { LoginBtn } from '@features/login';
import { ROUTES } from '@router';

const block = cn('header-block');

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isAuthPage = location.pathname === ROUTES.SIGNUP || location.pathname === ROUTES.SIGNIN;

  return (
    <div className="position-fixed w-100">
      <ul className={kebab(block(undefined, ['nav container']))}>
        <li className="flex-grow-1"></li>
        <li className={kebab(block('item', ['nav-item']))}>
          <LangSwitcher />
        </li>
        <li className={kebab(block('item', ['nav-item']))}>
          <ThemeSwitcher />
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
