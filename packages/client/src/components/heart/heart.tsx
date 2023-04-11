import { BsFillHeartFill } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { HeartProps } from './types';

const block = cn('heart');

export const Heart = (props: HeartProps): React.ReactElement => {
  return <BsFillHeartFill className={kebab(block(undefined, [props.className]))} onClick={props.onClick} />;
};
