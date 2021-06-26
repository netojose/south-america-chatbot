import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { useSendMessageMutation } from '../../services/voiceFlow';
import Button from '../Form/Button';

const Choice = ({ buttons, userID, id }: { buttons: string[]; userID: string; id: string }): React.ReactElement => {
  const [sendMessage] = useSendMessageMutation();
  const lastMessage = useSelector(({ messages: { items } }: RootState) => items[userID][items[userID].length - 1]);
  const isDisabled = lastMessage?.id !== id;
  const handleSendMessage = (message: string) => {
    sendMessage({ message, userID });
  };
  return (
    <div>
      {buttons.map((text) => (
        <Button key={text} disabled={isDisabled} onClick={() => handleSendMessage(text)} label={text} />
      ))}
    </div>
  );
};

export default Choice;
