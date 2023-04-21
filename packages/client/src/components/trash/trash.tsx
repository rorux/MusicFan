import { BsFillTrashFill } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { TrashProps } from './types';

const block = cn('trash');

export const Trash = (props: TrashProps): React.ReactElement => {
  return <BsFillTrashFill className={kebab(block('icon', [props.className]))} onClick={props.onClick} />;
};
