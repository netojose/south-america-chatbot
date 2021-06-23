import React from 'react';

import Modal from '../Modal';

const Confirm = ({
  isOpen,
  title,
  text,
  onRequestConfirm,
  onRequestCancel,
}: {
  isOpen: boolean;
  title: string;
  text: string;
  onRequestConfirm: () => void;
  onRequestCancel: () => void;
}): React.ReactElement => (
  <Modal isOpen={isOpen} title={title} showCloseBtn={false} closeOnEsc={false}>
    <p>{text}</p>
    <div>
      <input type="button" value="Ok" onClick={onRequestConfirm} />
      <input type="button" value="Cancel" onClick={onRequestCancel} />
    </div>
  </Modal>
);

export default Confirm;
