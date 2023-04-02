import { useEffect } from 'react';
import { useAppDispatch } from '@store';
import { checkAuth } from '@features/auth';

export const useCheckAuth = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);
};
