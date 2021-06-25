import React, { useCallback, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, match } from 'react-router-dom';

import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Message from '../../components/Message';
import { MessageSpeak } from '../../interfaces/Message';
import { clearQueue, removeItem } from '../../redux/slices/audioQueue';
import { RootState, useAppDispatch } from '../../redux/store';
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
  const currentPlaying = useRef<string>();
  const audioObj = useRef<HTMLAudioElement>();
  const dispatch = useAppDispatch();
  const user = useSelector(({ users: { items } }: RootState) => items[userID]);
  const messages = useSelector(({ messages: { items } }: RootState) => items[userID] ?? []);
  const audioQueue = useSelector(({ audioQueue: { items } }: RootState) => items);
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (audioQueue.length < 1) {
      return;
    }

    const [messageId] = audioQueue;

    if (messageId === currentPlaying.current) {
      return;
    }

    const message = messages.find((message) => message.id === messageId) as MessageSpeak;
    if (!message.audio) {
      return;
    }

    audioObj.current?.pause();
    audioObj.current = new Audio(message.audio);
    audioObj.current.addEventListener('ended', () => {
      dispatch(removeItem());
      currentPlaying.current = undefined;
    });
    audioObj.current.play();
    currentPlaying.current = messageId;
  }, [audioQueue, messages]);

  useEffect(() => {
    return () => {
      if (currentPlaying.current && audioObj.current) {
        audioObj.current.pause();
        currentPlaying.current = undefined;
        dispatch(clearQueue());
      }
    };
  }, []);

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
