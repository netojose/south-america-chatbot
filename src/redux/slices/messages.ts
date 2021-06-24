import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import Message from '../../interfaces/Message';
import MessagesSlice from '../../interfaces/MessagesSlice';
import { remove } from './users';

const initialState: MessagesSlice = {
  items: {},
};

const isRemoveUser = isAnyOf(remove);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ userID: string; message: Message }>) => {
      const { userID, message } = action.payload;
      state.items[userID] = [...(state.items[userID] ?? []), message];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRemoveUser, (state, action) => {
      delete state.items[action.payload];
    });
  },
});

export const { add } = messagesSlice.actions;
export default messagesSlice.reducer;
