import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { setPlaying } from '../../redux/slices/audioQueue';
import { RootState, useAppDispatch } from '../../redux/store';

const Speak = ({ text, audio, id }: { text: string; audio: string | null; id: string }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const audioQueue = useSelector(({ audioQueue }: RootState) => audioQueue.items);
  const isPlayint = audioQueue[0] === id;

  const handleRequestPlay = useCallback(() => {
    dispatch(setPlaying(id));
  }, [id]);

  return (
    <li style={isPlayint ? { backgroundColor: 'pink' } : undefined}>
      {text}
      {audio && (
        <button onClick={handleRequestPlay} disabled={isPlayint}>
          play
        </button>
      )}
    </li>
  );
};

export default Speak;
