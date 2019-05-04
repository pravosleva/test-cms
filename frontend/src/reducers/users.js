import { createSymbiote } from 'redux-symbiote';


export const { actions: usersActions, reducer: users } = createSymbiote(
  {
    response: null,
    items: [],
  },
  {
    // add: (state, newObj) => ({ ...state, uses: [...state.items, newObj] }),
    update: (state, response) => ({
      ...state,
      response,
      items: response && Array.isArray(response)
        ? response
        : [],
    }),
  },
);
