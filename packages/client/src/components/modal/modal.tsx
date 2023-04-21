import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useClickOutside } from '@hooks';
import { cn, kebab } from '@bem';
import { ModalWindowProps } from './types';

const block = cn('modal-window');

export const Modal = (props: ModalWindowProps) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => props.setOpen(false));

  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div className={kebab(block(undefined, props.isOpen ? ['active'] : undefined))}>
      <div
        className={`modal ${props.isOpen ? 'd-block' : undefined}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-dialog" ref={modalRef}>
          <div className={kebab(block('content', ['modal-content rounded-0']))}>
            <div className={kebab(block('header', ['modal-header']))}>
              <span className="modal-title h5">{props.title}</span>
              <button
                type="button"
                className={kebab(block('close', ['btn-close']))}
                onClick={() => props.setOpen(false)}
              ></button>
            </div>
            <div className={kebab(block('body', ['modal-body']))}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
