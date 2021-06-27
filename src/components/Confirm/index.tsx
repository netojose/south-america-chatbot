import React from 'react';

import Button from '../Form/Button';
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
    <p data-testid="confirm-text">{text}</p>
    <div>
      <Button type="button" label="Ok" onClick={onRequestConfirm} />
      <Button type="button" label="Cancel" variant="danger" onClick={onRequestCancel} />
    </div>
  </Modal>
);

export default Confirm;
