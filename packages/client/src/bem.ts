import { withNaming } from '@bem-react/classname';

export const kebab = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-z0-9])_([a-z0-9])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();

export const cn = withNaming({ n: '', e: '__', m: '--', v: '±' });
