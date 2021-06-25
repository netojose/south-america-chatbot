import React from 'react';

import MessageType, { MessageChoice, MessageSpeak, MessageUser } from '../../interfaces/Message';
import Choice from './Choice';
import Speak from './Speak';
import User from './User';

const Message = (props: MessageType & { userID: string }): React.ReactElement => {
  switch (props.type) {
    case 'choice':
      return <Choice {...(props as MessageChoice)} userID={props.userID} id={props.id} />;
    case 'speak':
      return <Speak {...(props as MessageSpeak)} id={props.id} />;
    default:
      return <User {...(props as MessageUser)} />;
  }
};

export default Message;
