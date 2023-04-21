import { AccordionItemProps } from './types';
import { useState } from 'react';
import { cn, kebab } from '@bem';

const block = cn('accordion-item');

export const AccordionItem = (props: AccordionItemProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={kebab(block(undefined, ['rounded-0']))}>
      <button
        className={kebab(block('header', { opened: isOpen }, ['accordion-button collapsed rounded-0']))}
        type="button"
        onClick={() => setOpen(!isOpen)}
      >
        {props.header}
      </button>
      <div className={kebab(block('body', { shown: isOpen }, ['accordion-body']))}>{props.children}</div>
    </div>
  );
};
