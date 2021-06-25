import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GeneralTrace, RequestType, TextRequest } from '@voiceflow/general-types';
import { nanoid } from 'nanoid';

import Message from '../interfaces/Message';
import { add as addMessage, clearChat } from '../redux/slices/messages';

const versionID = process.env.REACT_APP_VOICEFLOW_API_VERSION as string;
const APIKey = process.env.REACT_APP_VOICEFLOW_API_KEY as string;

interface Payload {
  userID: string;
  message: string;
}

const voiceFlow = createApi({
  reducerPath: 'voiceFlow',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://general-runtime.voiceflow.com/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', APIKey);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    sendMessage: build.mutation<GeneralTrace[], Payload>({
      query: ({ userID, message }) => {
        const request: TextRequest = { type: RequestType.TEXT, payload: message };
        return {
          url: `state/${versionID}/user/${userID}/interact`,
          method: 'POST',
          body: { request, config: { tts: true } },
        };
      },
      async onQueryStarted(arg, { dispatch }) {
        dispatch(addMessage({ userID: arg.userID, message: { id: nanoid(), type: 'user', text: arg.message } }));
      },
      async onCacheEntryAdded({ userID }, { cacheDataLoaded, dispatch }) {
        const response = await cacheDataLoaded;
        const { data } = response;
        const items = data.reduce<Array<Message>>((acc, curr) => {
          switch (curr.type) {
            case 'choice':
              return [...acc, { type: 'choice', id: nanoid(), buttons: curr.payload.buttons.map((button) => button.name) }];
            case 'speak':
              return [...acc, { type: 'speak', id: nanoid(), text: curr.payload.message, audio: curr.payload.src ?? null }];
            default:
              return acc;
          }
        }, []);

        items.forEach((message) => dispatch(addMessage({ userID, message })));

        if (data[data.length - 1].type === 'end') {
          dispatch(clearChat(userID));
        }
      },
    }),
  }),
});

export default voiceFlow;

export const { useSendMessageMutation } = voiceFlow;
