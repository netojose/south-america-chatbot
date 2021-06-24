import React from 'react';

import { useSendMessageMutation } from '../../services/voiceFlow';

const Choice = ({ buttons, userID }: { buttons: string[]; userID: string }): React.ReactElement => {
  const [sendMessage] = useSendMessageMutation();
  const handleSendMessage = (message: string) => {
    sendMessage({ message, userID });
  };
  return (
    <li>
      {buttons.map((text) => (
        <button key={text} onClick={() => handleSendMessage(text)}>
          {text}
        </button>
      ))}
    </li>
  );
};

export default Choice;
