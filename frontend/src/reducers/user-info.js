import { createSymbiote } from 'redux-symbiote';


export const { actions: userActions, reducer: user } = createSymbiote(
  {
    infoResponse: null,
  },
  {
    // add: (state, newObj) => ({ ...state, list: [...state.list, newObj] }),
    update: (state, infoResponse) => ({
      ...state,
      infoResponse
    }),
  },
);
