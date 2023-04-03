import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 400): string {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
