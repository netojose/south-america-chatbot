import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { add } from '../../redux/slices/users';
import { RootState, useAppDispatch } from '../../redux/store';
import makeSlug from '../../utils/makeSlug';
import Form, { Button, Input } from '../Form';
import Modal from '../Modal';

interface FormValues {
  name: string;
}

const ModalAddUser = function ({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void }): React.ReactElement {
  const idUsers = useSelector(({ users }: RootState) => Object.keys(users.items));
  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    ({ name }: FormValues) => {
      dispatch(add({ name, slug: makeSlug(name) }));
      onRequestClose();
    },
    [onRequestClose]
  );

  const validationRules = useMemo(
    () => ({
      name: Yup.string()
        .required()
        .test('available', 'This name is not available', (value) => !idUsers.includes(makeSlug(value || ''))),
    }),
    [idUsers]
  );

  return (
    <Modal title="Add a new user" isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form<FormValues> onSubmit={handleSubmit} rules={validationRules}>
        <Input label="Name" name="name" />
        <Button label="Add user" />
      </Form>
    </Modal>
  );
};

export default ModalAddUser;
