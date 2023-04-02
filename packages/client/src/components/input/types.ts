import { IClassNameProps } from '@bem-react/core';

export type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  icon?: JSX.Element;
} & IClassNameProps;
