import { PropsWithChildren } from 'react';

export type AccordionItemProps = {
  header: JSX.Element | string;
} & PropsWithChildren;
