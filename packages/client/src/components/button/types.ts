import { IClassNameProps } from '@bem-react/core';

export type ButtonProps = {
  label: string;
  loading?: boolean;
} & IClassNameProps;
