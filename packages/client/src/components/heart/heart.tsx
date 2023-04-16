import { BsFillHeartFill } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { HeartProps } from './types';

const block = cn('heart');

export const Heart = (props: HeartProps): React.ReactElement => {
  return (
    <BsFillHeartFill
      className={kebab(block('icon', { active: props.isActive ?? false }, [props.className]))}
      onClick={props.onClick}
    />
  );
};
