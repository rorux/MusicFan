import { IClassNameProps } from '@bem-react/core';

export type HeartProps = {
  onClick?: () => void;
  isActive?: boolean;
} & IClassNameProps;
