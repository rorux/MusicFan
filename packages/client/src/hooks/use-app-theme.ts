import { useEffect } from 'react';
import { useAppSelector } from '@store';

export const useAppTheme = (): void => {
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
};
