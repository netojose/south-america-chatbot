import classNames from 'classnames';
import React from 'react';

import MessageType, { MessageChoice, MessageSpeak, MessageUser } from '../../interfaces/Message';
import Choice from './Choice';
import Speak from './Speak';
import User from './User';

const Message = (props: MessageType & { userID: string }): React.ReactElement => {
  return (
    <li
      className={classNames(
        'my-2 rounded-xl p-2 w-4/5 flex',
        { 'bg-royalblue-100 float-left': props.type === 'user' },
        { 'bg-royalblue-300 float-right': props.type !== 'user' }
      )}
    >
      {(() => {
        switch (props.type) {
          case 'choice':
            return <Choice {...(props as MessageChoice)} userID={props.userID} id={props.id} />;
          case 'speak':
            return <Speak {...(props as MessageSpeak)} id={props.id} />;
          default:
            return <User {...(props as MessageUser)} />;
        }
      })()}
    </li>
  );
};

export default Message;
