import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { add } from '../../redux/slices/users';
import { RootState, useAppDispatch } from '../../redux/store';
import makeSlug from '../../utils/makeSlug';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Modal from '../Modal';

interface FormInputs {
  name: string;
}

const ModalAddUser = function ({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void }): React.ReactElement {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>();
  const idUsers = useSelector(({ users }: RootState) => Object.keys(users.items));
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    ({ name }) => {
      dispatch(add({ name, slug: makeSlug(name) }));
      setValue('name', '');
      onRequestClose();
    },
    [onRequestClose]
  );

  const handleRequestClose = useCallback(() => {
    setValue('name', '');
    clearErrors();
    onRequestClose();
  }, []);

  const isValidId = useCallback((value) => !idUsers.includes(makeSlug(value || '')) || 'This name is not available', [idUsers]);

  return (
    <Modal title="Add a new user" isOpen={isOpen} onRequestClose={handleRequestClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<FormInputs>
          register={register('name', { required: 'The name is required', validate: isValidId })}
          label="Name"
          error={errors?.name?.message}
        />
        <Button label="Add user" variant="primary" />
      </form>
    </Modal>
  );
};

export default ModalAddUser;
