import { ReactElement } from 'react';
import { cn, kebab } from '@bem';
import { InputProps } from './types';

const block = cn('ui-input');

export const Input = (props: InputProps): ReactElement => {
  return (
    <div className={kebab(block(undefined, ['input-group']))}>
      <span className={kebab(block('icon', ['input-group-text rounded-0']))}>{props.icon}</span>
      <input
        id={props.id}
        type={props.type}
        className={kebab(block('field', ['form-control rounded-0']))}
        placeholder={props.placeholder}
        aria-label={props.id}
        aria-describedby="id"
      />
    </div>
  );
};
