import React, { useCallback, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, match } from 'react-router-dom';

import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Message from '../../components/Message';
import PageTitle from '../../components/PageTitle';
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
  const chatArea = useRef<HTMLUListElement>(null);
  const currentPlaying = useRef<string>();
  const audioObj = useRef<HTMLAudioElement>();
  const dispatch = useAppDispatch();
  const user = useSelector(({ users: { items } }: RootState) => items[userID]);
  const messages = useSelector(({ messages: { items } }: RootState) => items[userID] ?? []);
  const audioQueue = useSelector(({ audioQueue: { items } }: RootState) => items);
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    const { current: chatWrapper } = chatArea;
    if (!chatWrapper) {
      return;
    }

    chatWrapper.scrollTop = chatWrapper.scrollHeight;
    chatWrapper.animate({ scrollTop: chatWrapper.scrollHeight });
    clearErrors();
  }, [messages]);

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
      <PageTitle title="User not found" />
      <p>
        <Link to="/dashboard">Go to dashboard</Link>
      </p>
    </div>
  ) : (
    <div className="flex flex-col h-screen">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-royalblue-800 border border-royalblue-800 rounded-md px-2 hover:bg-royalblue-300 hover:text-white">
          Back
        </Link>
        <div className="flex-1">
          <PageTitle title={`Chat with ${user.name}`} />
        </div>
      </div>

      <ul className="overflow-auto scroll-smooth flex-1" ref={chatArea}>
        {messages.map((message) => (
          <Message key={message.id} {...message} userID={userID} />
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className="flex bg-royalblue-200 items-center mb-3 pl-3 py-3 rounded-xl">
        <div className="flex-1">
          <Input<FormInputs>
            register={register('message', { required: 'The message is required' })}
            error={errors?.message?.message}
            placeholder="Type your message here"
          />
        </div>
        <Button label="Send message" />
      </form>
    </div>
  );
};

export default Chat;
