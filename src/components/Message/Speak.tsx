import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { setPlaying } from '../../redux/slices/audioQueue';
import { RootState, useAppDispatch } from '../../redux/store';

const Speak = ({ text, audio, id }: { text: string; audio: string | null; id: string }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const audioQueue = useSelector(({ audioQueue }: RootState) => audioQueue.items);

  const handleRequestPlay = useCallback(() => {
    dispatch(setPlaying(id));
  }, [id]);

  return (
    <li style={audioQueue[0] === id ? { backgroundColor: 'pink' } : undefined}>
      {text}
      {audio && (
        <button onClick={handleRequestPlay} disabled={audioQueue.length > 0}>
          play
        </button>
      )}
    </li>
  );
};

export default Speak;
