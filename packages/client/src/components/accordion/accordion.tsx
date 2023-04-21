import { PropsWithChildren } from 'react';

export const Accordion = (props: PropsWithChildren) => {
  return <div className="accordion rounded-0">{props.children}</div>;
};
