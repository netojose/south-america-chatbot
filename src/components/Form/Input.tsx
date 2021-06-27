import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

function Input<FormInputs>({
  label,
  placeholder,
  error,
  register,
}: {
  label?: string;
  placeholder?: string;
  error?: string | null;
  register: ReturnType<UseFormRegister<FormInputs>>;
}): React.ReactElement {
  const id = useRef<string>(nanoid());
  return (
    <label htmlFor={id.current}>
      {label && (
        <span className="block text-gray-700 text-sm font-bold mb-2" data-testid="input-label">
          {label}
        </span>
      )}
      <input
        type="text"
        id={id.current}
        placeholder={placeholder}
        {...register}
        className={classNames(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline',
          { 'border-danger': !!error }
        )}
      />
      {error && (
        <span className="block text-danger text-xs pb-1" data-testid="input-error">
          {error}
        </span>
      )}
    </label>
  );
}

export default Input;
