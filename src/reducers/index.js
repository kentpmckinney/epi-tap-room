import { combineReducers } from 'redux';
import kegReducer from './kegReducer';
import editReducer from './editReducer';

export default combineReducers(
  {
    kegReducer,
    editReducer
  }
);