import { SpinnerProps } from './types';

export const Spinner = (props: SpinnerProps): React.ReactElement => {
  const size = props.size === 'small' ? 'spinner-border-sm' : '';

  return (
    <div className={`w-100 h-100 d-flex justify-content-center align-items-center ${props.className ?? ''}`}>
      <div className={`spinner spinner-border text-secondary ${size}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
