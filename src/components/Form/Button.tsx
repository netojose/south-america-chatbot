import classNames from 'classnames';
import React, { MouseEvent } from 'react';

const Button = ({
  type = 'submit',
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}: {
  type?: 'submit' | 'button' | 'reset';
  label: string;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
}): React.ReactElement => (
  <input
    type={type}
    value={label}
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      'm-2 text-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border rounded-md hover:shadow-sm hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed',
      { 'bg-primary': variant === 'primary' },
      { 'bg-danger': variant === 'danger' }
    )}
  />
);

export default Button;
