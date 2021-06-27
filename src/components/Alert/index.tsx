import classNames from 'classnames';
import React from 'react';

const Alert = ({ show, message, type = 'success' }: { show: boolean; message: string; type?: 'error' | 'success' }): React.ReactElement | null =>
  show ? (
    <div
      className={classNames(' border px-4 py-3 rounded relative my-3', {
        'bg-red-100 border-red-400 text-red-700': type === 'error',
        'bg-green-100 border-green-400 text-green-700': type === 'success',
      })}
      data-testid="alert-wrapper"
      role="alert"
    >
      <span className="block sm:inline" data-testid="alert-message">
        {message}
      </span>
    </div>
  ) : null;

export default Alert;
