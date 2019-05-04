import { userActions } from '../reducers/user-info';


export const updateUserInfo = res => async (dispatch) => {
  // console.log(res);
  try {
    await dispatch(userActions.update(res));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};
