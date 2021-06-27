import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function ({
  title,
  isOpen,
  children,
  onRequestClose = () => null,
  showCloseBtn = true,
  closeOnEsc = true,
}: {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose?: () => void;
  showCloseBtn?: boolean;
  closeOnEsc?: boolean;
}): React.ReactElement {
  const domNodeRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(domNodeRef.current);
    return () => domNodeRef.current.remove();
  }, []);

  const watchKeyboard = useCallback(
    ({ code }: KeyboardEvent) => {
      if (code === 'Escape' && isOpen) {
        onRequestClose();
      }
    },
    [isOpen, onRequestClose]
  );

  const addKeyBoardListener = useCallback(() => document.addEventListener('keydown', watchKeyboard), [watchKeyboard]);
  const removeKeyBoardListener = useCallback(() => document.removeEventListener('keydown', watchKeyboard), [watchKeyboard]);

  useEffect(() => {
    if (isOpen && closeOnEsc) {
      addKeyBoardListener();
    } else {
      removeKeyBoardListener();
    }
    return () => removeKeyBoardListener();
  }, [isOpen, closeOnEsc, onRequestClose]);

  return createPortal(
    isOpen ? (
      <>
        <div
          role="dialog"
          className="fixed z-50 shadow-inner max-w-md md:relative align-top m-auto justify-end md:justify-center p-6 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col"
          data-testid="modal-wrapper"
        >
          <h3 className="text-xl font-bold mb-2 text-center" data-testid="modal-title">
            {title}
          </h3>
          {showCloseBtn && (
            <button
              onClick={onRequestClose}
              className="absolute -top-3 -right-3 leading-none bg-royalblue-500 rounded-full	p-1 w-7 h-7 text-white"
              data-testid="modal-close-btn"
            >
              X
            </button>
          )}
          <div data-testid="modal-content">{children}</div>
        </div>
        <div
          role="button"
          onClick={onRequestClose}
          onKeyDown={onRequestClose}
          tabIndex={-1}
          className="inset-0 cursor-auto opacity-40 fixed z-40 overflow-auto bg-black flex"
          data-testid="modal-overlay"
        />
      </>
    ) : null,
    domNodeRef.current
  );
};

export default Modal;
