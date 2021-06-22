import React from 'react';
import { useFormContext } from 'react-hook-form';

const FieldError = ({ name }: { name: string }): React.ReactElement | null => {
  const {
    formState: { errors },
  } = useFormContext();
  const message = errors[name]?.message;
  return message ? <p>{message}</p> : null;
};

export default FieldError;
