import React, { useCallback } from 'react';

import { setPlaying } from '../../redux/slices/audioQueue';
import { useAppDispatch } from '../../redux/store';

const Speak = ({ text, audio, id }: { text: string; audio: string | null; id: string }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const handleRequestPlay = useCallback(() => {
    dispatch(setPlaying(id));
  }, [id]);
  return (
    <li>
      {text}
      {audio && <button onClick={handleRequestPlay}>play</button>}
    </li>
  );
};

export default Speak;
