import { ENTER_EDIT_MODE, LEAVE_EDIT_MODE } from '../actions/types';

export default (state = { key: null }, action) => {
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