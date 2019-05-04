import { usersActions } from '../reducers/users';


export const updateUsers = res => async (dispatch) => {
  try {
    await dispatch(usersActions.update(res));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};


export const getUsersAndSetToStore = () => async dispatch => {
  try {
    const response = await fetch('/users')
      .then(res => res.json())
      .catch(err => console.log(err));

    if (response) {
      dispatch(updateUsers(response));
    }
    return Promise.resolve();
  }
  catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
