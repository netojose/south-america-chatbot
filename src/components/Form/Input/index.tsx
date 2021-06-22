import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import FieldError from '../FieldError';

const Input = function ({ label, name }: { label: string; name: string }): React.ReactElement {
  const id = useRef<string>(`id-${performance.now()}`);
  const { register } = useFormContext();
  return (
    <label htmlFor={id.current}>
      <span>{label}</span>
      <input id={id.current} {...register(name)} />
      <FieldError name={name} />
    </label>
  );
};

export default Input;
