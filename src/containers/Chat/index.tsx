import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, match } from 'react-router-dom';
import * as Yup from 'yup';

import Form, { Button, Input } from '../../components/Form';
import Message from '../../components/Message';
import { RootState } from '../../redux/store';
import { useSendMessageMutation } from '../../services/voiceFlow';

const validationRules = {
  message: Yup.string().required(),
};

interface FormValues {
  message: string;
}

const Chat = ({
  match: {
    params: { userID },
  },
}: {
  match: match<{ userID: string }>;
}): React.ReactElement => {
  const user = useSelector(({ users }: RootState) => users.items[userID]);
  const messages = useSelector(({ messages }: RootState) => messages.items[userID] ?? []);
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = useCallback(
    ({ message }: FormValues) => {
      sendMessage({ message, userID });
    },
    [userID]
  );

  return !user ? (
    <div>
      <p>User not found</p>
      <p>
        <Link to="/dashboard">Go to dashboard</Link>
      </p>
    </div>
  ) : (
    <div>
      <h1>{user.name} Chat</h1>

      <ul>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </ul>

      <Form<FormValues> onSubmit={handleSubmit} rules={validationRules}>
        <Input label="Message" name="message" placeholder="Type your message here" />
        <Button label="Send message" />
      </Form>
    </div>
  );
};

export default Chat;
