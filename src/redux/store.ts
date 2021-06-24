import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import voiceFlow from '../services/voiceFlow';
import messages from './slices/messages';
import users from './slices/users';

const store = configureStore({
  reducer: {
    users,
    messages,
    [voiceFlow.reducerPath]: voiceFlow.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(voiceFlow.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
