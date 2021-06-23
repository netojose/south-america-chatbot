import React, { MouseEvent } from 'react';

const Button = ({
  label,
  type = 'submit',
  onClick,
}: {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}): React.ReactElement => <input type={type} value={label} onClick={onClick} />;

export default Button;
