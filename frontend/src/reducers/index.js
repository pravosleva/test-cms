import { combineReducers } from 'redux';
import { user } from './user-info';


const rootReducer = combineReducers({
  // state: (state = {
  //   a: 1,
  // }) => state,
  user,
});

export default rootReducer;
