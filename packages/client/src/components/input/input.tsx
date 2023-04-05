import { cn, kebab } from '@bem';
import { InputProps } from './types';

const block = cn('ui-input');

export const Input = (props: InputProps): React.ReactElement => {
  return (
    <div className={kebab(block(undefined, ['input-group', props.className]))}>
      {props.icon && <span className={kebab(block('icon', ['input-group-text rounded-0']))}>{props.icon}</span>}
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(event) => props.onChange(event)}
        className={kebab(block('field', ['form-control rounded-0']))}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  );
};
