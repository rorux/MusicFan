import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { BackBtnProps } from './types';

export const BackBtn = ({ route, className }: BackBtnProps): React.ReactElement => {
  return (
    <Link to={route} className={className}>
      <BsArrowLeft />
    </Link>
  );
};
