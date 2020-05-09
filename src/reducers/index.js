import { combineReducers } from 'redux';

const reducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_ITEM':
      return [{ ...payload }, ...state];
    default:
      return state;
  }
}

export default combineReducers({ reducer: reducer });