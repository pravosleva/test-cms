import { userActions } from '../reducers/user-info';
import axios from 'axios';

const updateUserInfo = res => async (dispatch) => {
  // console.log(res);
  try {
    await dispatch(userActions.update(res));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const tryToLogin = ({ userName, password }) => async dispatch => {
  const response = await axios({
      method: 'post',
      url: '/auth/local',
      data: { identifier: userName, password },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(res => res.data)
    .catch(err => {
      // console.warn(err);
      return ({
        error: 'Request failed!',
        statusCode: err.response.status,
        message: err.response.data
      });
    });

  // console.log(response);
  if (response && response.user) {
    dispatch(updateUserInfo(response.user));
    dispatch(userActions.fillTimestamp((() => new Date())().getTime()));
  }
  else if (response) {
    dispatch(updateUserInfo(response));
  }

  if (response && response.jwt) {
    return Promise.resolve(response.jwt);
  }
  return Promise.reject(response);
};

export const getMyUserInfoAndSetToStore = ({ jwt }) => async dispatch => {
  const response = await axios({
    method: 'get',
    url: '/users/me',
    headers: { 'Authorization': `Bearer ${jwt}` },
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    },
  })
    .then(res => res.data)
    .catch(err => {
      // console.warn(err);
      return ({
        error: 'Request failed!',
        statusCode: err.response.status,
        message: err.response.data
      });
    });

  dispatch(updateUserInfo(response));
  // console.log();
  if (response.role) {
    dispatch(userActions.fillTimestamp((() => new Date())().getTime()));
  }
};
