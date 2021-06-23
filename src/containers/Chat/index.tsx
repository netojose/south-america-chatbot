/* eslint no-console: "off" */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, match } from 'react-router-dom';
import * as Yup from 'yup';

import Form, { Button, Input } from '../../components/Form';
import { RootState } from '../../redux/store';

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

  const handleSubmit = useCallback(({ message }: FormValues) => {
    message.toLocaleLowerCase();
  }, []);

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

      <dl>
        <dt>Can I order some pizza</dt>
        <dd>Sure what kind of pizza do you want?</dd>

        <dt>Pepperoni and Cheese</dt>
        <dd>Great, pepperoni and cheese coming up!</dd>
      </dl>

      <Form<FormValues> onSubmit={handleSubmit} rules={validationRules}>
        <Input label="Message" name="message" placeholder="Type your message here" />
        <Button label="Send message" />
      </Form>
    </div>
  );
};

export default Chat;
