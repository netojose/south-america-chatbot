import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Message from '../../interfaces/Message';
import MessagesSlice from '../../interfaces/MessagesSlice';

const initialState: MessagesSlice = {
  items: {},
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ userID: string; message: Message }>) => {
      const { userID, message } = action.payload;
      state.items[userID] = [...(state.items[userID] ?? []), message];
    },
  },
});

export const { add } = messagesSlice.actions;
export default messagesSlice.reducer;
