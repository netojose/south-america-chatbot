import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Audio from '../../interfaces/Audio';
import AudiosSlice from '../../interfaces/AudiosSlice';

const initialState: AudiosSlice = {
  items: [],
};

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
});

export const { setPlaying, removeItem, clearQueue } = audioQueueSlice.actions;
export default audioQueueSlice.reducer;
