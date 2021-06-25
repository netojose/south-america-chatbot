import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { useSendMessageMutation } from '../../services/voiceFlow';

const Choice = ({ buttons, userID, id }: { buttons: string[]; userID: string; id: string }): React.ReactElement => {
  const [sendMessage] = useSendMessageMutation();
  const lastMessage = useSelector(({ messages: { items } }: RootState) => items[userID][items[userID].length - 1]);
  const isDisabled = lastMessage?.id !== id;
  const handleSendMessage = (message: string) => {
    sendMessage({ message, userID });
  };
  return (
    <li>
      {buttons.map((text) => (
        <button key={text} disabled={isDisabled} onClick={() => handleSendMessage(text)}>
          {text}
        </button>
      ))}
    </li>
  );
};

export default Choice;
