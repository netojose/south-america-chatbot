import React from 'react';

const Choice = ({ buttons }: { buttons: string[] }): React.ReactElement => (
  <li>
    {buttons.map((button) => (
      <button key={button}>{button}</button>
    ))}
  </li>
);

export default Choice;
