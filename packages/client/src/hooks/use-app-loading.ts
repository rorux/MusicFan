import { useEffect, useState } from 'react';
import { useAppSelector } from '@store';

export const useAppLoading = (): boolean => {
  const [show, setShow] = useState(false);
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [show]);

  return loading || !show;
};
