import React from 'react';

import MessageType, { MessageChoice, MessageSpeak, MessageUser } from '../../interfaces/Message';
import Choice from './Choice';
import Speak from './Speak';
import User from './User';

const Message = (props: MessageType): React.ReactElement => {
  switch (props.type) {
    case 'choice':
      return <Choice {...(props as MessageChoice)} />;
    case 'speak':
      return <Speak {...(props as MessageSpeak)} />;
    default:
      return <User {...(props as MessageUser)} />;
  }
};

export default Message;
