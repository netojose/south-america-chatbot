import React from 'react';

const Button = ({ label, type = 'submit' }: { label: string; type?: string }): React.ReactElement => <input type={type} value={label} />;

export default Button;
