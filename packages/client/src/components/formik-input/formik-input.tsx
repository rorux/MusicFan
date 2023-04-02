import { cn, kebab } from '@bem';
import { FormikInputProps } from './types';

const block = cn('formik-input');

export const FormikInput = (props: FormikInputProps): React.ReactElement => {
  const isInvalidClassname = props.isInvalid === true ? 'is-invalid' : undefined;
  const isValidClassname = props.isInvalid === false && props.value ? 'is-valid' : undefined;

  return (
    <div className={kebab(block(undefined, ['input-group']))}>
      {props.icon && <span className={kebab(block('icon', ['input-group-text rounded-0']))}>{props.icon}</span>}
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.name}
        className={kebab(block('field', ['form-control rounded-0', isValidClassname, isInvalidClassname]))}
        placeholder={props.placeholder}
        aria-label={props.name}
        aria-describedby="id"
      />
      <div className="invalid-feedback text-center">{props.invalidFeedback}</div>
    </div>
  );
};
