import { createSymbiote } from 'redux-symbiote';

import { payloadField } from '../lib/symbiote-helpers';


export const { actions: userActions, reducer: user } = createSymbiote(
  {
    infoResponse: null,

    // Чтоб запрашивать авторизацию не чаще указанного
    timestamp: null,
    maxTimestampAge: 1000 * 60 * 2, // last num is minutes
  },
  {
    // add: (state, newObj) => ({ ...state, list: [...state.list, newObj] }),
    update: (state, infoResponse) => ({
      ...state,
      infoResponse
    }),
    fillTimestamp: payloadField('timestamp'),
  },
);
