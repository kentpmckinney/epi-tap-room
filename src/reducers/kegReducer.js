import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/types';

export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_ITEM:
      return [...state, { ...data }];
    case UPDATE_ITEM:
      return state.map(item => item.key === data.key ? { ...data } : item);
    case DELETE_ITEM:
      return state.filter(item => item.key !== data.key);
    default:
      return state;
  }
}