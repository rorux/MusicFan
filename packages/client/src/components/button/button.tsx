import { ButtonProps } from './types';

export const Button = (props: ButtonProps): React.ReactElement => {
  const className = `btn btn-outline-green w-100 h-100 rounded-0 text-uppercase d-flex justify-content-center align-items-center ${props.className}`;

  return (
    <button type="submit" className={className} onClick={props.onClick}>
      {props.loading && (
        <span
          className="spinner-grow me-1"
          style={{ width: '0.7rem', height: '0.7rem' }}
          role="status"
          aria-hidden="true"
        ></span>
      )}
      <small>{props.label}</small>
    </button>
  );
};
