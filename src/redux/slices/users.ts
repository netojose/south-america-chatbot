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
  },
});

export const { add } = usersSlice.actions;
export default usersSlice.reducer;
