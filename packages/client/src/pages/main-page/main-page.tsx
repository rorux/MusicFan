import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { cn, kebab } from '@bem';
import { useAppDispatch } from '@store';
import { logout } from '@features/auth';
import { Header } from '@widgets/header';
import { ROUTES } from '@router';

const block = cn('main-page');

export const MainPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <div className="container">
        <h1>Главная страница</h1>
        <button onClick={() => dispatch(logout())}>Выйти</button>
        <Link to={ROUTES.SIGNIN}>Авторизация</Link>
        <Link to={ROUTES.SIGNUP}>Регистрация</Link>
        <div className={kebab(block('text-block', ['p-3']))}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non vulputate dolor, ac aliquam velit.
          Duis faucibus sapien in turpis sodales commodo. Maecenas sit amet consequat massa. Duis sit amet pharetra
          nisi. Nam blandit vestibulum urna, id finibus sapien vulputate eu. Donec ac pretium magna. Nullam ultrices
          ligula quis velit ultricies, sit amet tempor elit dictum. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Maecenas dui odio, mattis mollis lacus a, imperdiet finibus orci.
          Quisque quis auctor nisl.
        </div>
      </div>
    </>
  );
};
