import { usersActions } from '../reducers/users';


export const updateUsers = res => async (dispatch) => {
  console.log(res);
  try {
    await dispatch(usersActions.update(res));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};
