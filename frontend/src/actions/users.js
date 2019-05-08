import axios from 'axios';
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
    const response = await axios({
        method: 'get',
        url: '/users',
        validateStatus: function (status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      })
      .then(res => res.data)
      .catch(err => {
        throw ({
          statusCode: err.response.status,
          message: err.response.data,
          error: err.error || 'Request failed'
        });
      });

    if (response) {
      dispatch(updateUsers(response));
    }
    return Promise.resolve();
  }
  catch (err) {
    // console.error(err);
    return Promise.reject(err);
  }
};
