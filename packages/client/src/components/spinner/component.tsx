import { ReactElement } from 'react';
import { cn, kebab } from '@bem';

const block = cn('spinner');

export const Spinner = (): ReactElement => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className={kebab(block(undefined, ['spinner-border text-secondary']))} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
