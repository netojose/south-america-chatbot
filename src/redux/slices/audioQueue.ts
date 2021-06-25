import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import Audio from '../../interfaces/Audio';
import AudiosSlice from '../../interfaces/AudiosSlice';
import { MessageSpeak } from '../../interfaces/Message';
import { add } from './messages';

const initialState: AudiosSlice = {
  items: [],
};

const isMessageAdded = isAnyOf(add);

export const audioQueueSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<Audio>) => {
      state.items = [action.payload];
    },
    removeItem: (state) => {
      state.items.shift();
    },
    clearQueue: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isMessageAdded, (state, { payload: { message } }) => {
      if (message.type === 'speak' && (message as MessageSpeak).audio) {
        state.items.push(message.id);
      }
    });
  },
});

export const { setPlaying, removeItem, clearQueue } = audioQueueSlice.actions;
export default audioQueueSlice.reducer;
