import { useAppDispatch, useAppSelector } from '@store';
import { useEffect } from 'react';
import { setTheme } from '@features/theme/theme-slice';

export const useTheme = (props: { checked: boolean }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(setTheme(props.checked ? 'dark' : 'light'));
  }, [props.checked]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
};
