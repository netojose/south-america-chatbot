import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import UsersSlice from '../../interfaces/UsersSlice';

const initialState: UsersSlice = {
  items: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ slug: string; name: string }>) => {
      const { slug, name } = action.payload;
      state.items[slug] = { name };
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
  },
});

export const { add, remove } = usersSlice.actions;
export default usersSlice.reducer;
