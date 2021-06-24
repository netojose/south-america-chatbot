import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

function Input<FormInputs>({
  label,
  error,
  register,
}: {
  label: string;
  error?: string | null;
  register: ReturnType<UseFormRegister<FormInputs>>;
}): React.ReactElement {
  const id = useRef<string>(nanoid());
  return (
    <label htmlFor={id.current}>
      <span>{label}</span>
      <input id={id.current} type="text" {...register} />
      {error && <span>{error}</span>}
    </label>
  );
}

export default Input;
