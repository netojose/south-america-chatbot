import React, { MouseEvent } from 'react';

const Button = ({
  label,
  type = 'submit',
  onClick,
}: {
  label: string;
  type?: string;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}): React.ReactElement => <input type={type} value={label} onClick={onClick} />;

export default Button;
