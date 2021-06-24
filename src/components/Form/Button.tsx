import React from 'react';

const Button = ({ type = 'submit', label }: { type?: 'submit' | 'button' | 'reset'; label: string }): React.ReactElement => (
  <input type={type} value={label} />
);

export default Button;
