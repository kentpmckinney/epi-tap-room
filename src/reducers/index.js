import { combineReducers } from 'redux';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ENTER_EDIT_MODE, LEAVE_EDIT_MODE } from '../actions';

const kegReducer = (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_ITEM:
      return [{ ...data }, ...state];
    case UPDATE_ITEM:
      console.log(`kegReducer: ${action.type + '-' + action.data.key + '-' + action.data.name}`)
      return state.map(item => item.key === data.key ? { ...data } : item);
    case DELETE_ITEM:
      return state.filter(item => item.key !== data.key);
    default:
      return state;
  }
}

const editReducer = (state = { key: null }, action) => {
  const { type, data } = action;
  switch (type) {
    case ENTER_EDIT_MODE:
      return { key: data.key };
    case LEAVE_EDIT_MODE:
      return { key: null };
    default:
      return state;
  }
}

export default combineReducers({ kegReducer, editReducer });