import { IClassNameProps } from '@bem-react/core';

export type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: JSX.Element;
} & IClassNameProps;
