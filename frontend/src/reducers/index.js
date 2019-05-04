import { combineReducers } from 'redux';
import { user } from './user-info';
import { users } from './users';


const rootReducer = combineReducers({
  // state: (state = {
  //   a: 1,
  // }) => state,
  user,
  users,
});

export default rootReducer;
