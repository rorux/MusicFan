import { ReactElement } from 'react';
import { cn, kebab } from '../../bem';

const block = cn('main-title');

export const MainPage = (): ReactElement => {
  return <h1 className={kebab(block())}>Главная страница</h1>;
};
