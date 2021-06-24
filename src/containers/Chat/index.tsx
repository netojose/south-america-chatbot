import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, match } from 'react-router-dom';

import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Message from '../../components/Message';
import { RootState } from '../../redux/store';
import { useSendMessageMutation } from '../../services/voiceFlow';

interface FormInputs {
  message: string;
}

const Chat = ({
  match: {
    params: { userID },
  },
}: {
  match: match<{ userID: string }>;
}): React.ReactElement => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>();
  const user = useSelector(({ users }: RootState) => users.items[userID]);
  const messages = useSelector(({ messages }: RootState) => messages.items[userID] ?? []);
  const [sendMessage] = useSendMessageMutation();

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    ({ message }) => {
      sendMessage({ message, userID });
      setValue('message', '');
      clearErrors();
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
          <Message key={message.id} {...message} userID={userID} />
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<FormInputs> label="Message" register={register('message', { required: 'The message is required' })} error={errors?.message?.message} />
        <Button label="Send message" />
      </form>
    </div>
  );
};

export default Chat;
