import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store';
import { checkAuth } from '@features/auth';

export const useCheckAuth = (): { isAuth: boolean } => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return { isAuth };
};
