import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { IClassNameProps } from '@bem-react/core';

export type ModalWindowProps = {
  title: string | JSX.Element;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & IClassNameProps &
  PropsWithChildren;
