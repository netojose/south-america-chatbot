/* eslint no-console: "off" */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';

const Chat = (): React.ReactElement => {
  const { userID } = useParams<{ userID: string }>();
  const user = useSelector(({ users }: RootState) => users.items[userID]);
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

      <input placeholder="user input here" />
      <button>send</button>
    </div>
  );
};

export default Chat;
