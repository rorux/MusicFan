import { useAppDispatch } from '@store';
import { useEffect } from 'react';
import { setTheme } from '@features/theme/theme-slice';

export const useTheme = (props: { checked: boolean }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTheme(props.checked ? 'dark' : 'light'));
  }, [props.checked]);
};
