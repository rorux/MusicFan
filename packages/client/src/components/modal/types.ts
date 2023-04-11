import { Dispatch, SetStateAction } from 'react';
import { IClassNameProps } from '@bem-react/core';

export type ModalWindowProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & IClassNameProps;
