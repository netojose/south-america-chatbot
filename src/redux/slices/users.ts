import { createSlice } from '@reduxjs/toolkit';

import UsersSlice from '../../interfaces/UsersSlice';

const initialState = {
  items: [],
  isLoading: false,
} as UsersSlice;

export const messagesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default messagesSlice.reducer;
