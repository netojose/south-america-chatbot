import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function ({
  title,
  isOpen,
  children,
  onRequestClose,
}: {
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
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
    if (isOpen) {
      addKeyBoardListener();
    } else {
      removeKeyBoardListener();
    }
    return () => removeKeyBoardListener();
  }, [isOpen, onRequestClose]);

  return createPortal(
    isOpen ? (
      <>
        <div role="dialog">
          <h3>{title}</h3>
          <button onClick={onRequestClose}>X</button>
          {children}
        </div>
        <div
          role="button"
          onClick={onRequestClose}
          onKeyDown={onRequestClose}
          tabIndex={-1}
          style={{ width: 100, height: 100, backgroundColor: 'blue' }}
        />
      </>
    ) : null,
    domNodeRef.current
  );
};

export default Modal;
