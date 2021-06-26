import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { setPlaying } from '../../redux/slices/audioQueue';
import { RootState, useAppDispatch } from '../../redux/store';
import Button from '../Form/Button';

const Speak = ({ text, audio, id }: { text: string; audio: string | null; id: string }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const audioQueue = useSelector(({ audioQueue }: RootState) => audioQueue.items);
  const isPlaying = audioQueue[0] === id;

  const handleRequestPlay = useCallback(() => {
    dispatch(setPlaying(id));
  }, [id]);

  return (
    <div className={classNames('flex items-center justify-between w-full rounded-xl pl-2', { 'bg-royalblue-500 text-white': isPlaying })}>
      <span>{text}</span>
      {audio && <Button onClick={handleRequestPlay} disabled={isPlaying} label="Play" type="button" />}
    </div>
  );
};

export default Speak;
