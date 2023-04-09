import { RefObject, useEffect, useMemo } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement>, clickHandler: () => void) {
  const handleClickOutside = useMemo(
    () =>
      (event: MouseEvent): void => {
        if (ref && ref.current && !ref.current.contains(event.target as HTMLElement)) {
          clickHandler();
        }
      },
    [ref, clickHandler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handleClickOutside]);
}
