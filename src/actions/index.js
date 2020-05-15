export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ENTER_EDIT_MODE = 'ENTER_EDIT_MODE';
export const LEAVE_EDIT_MODE = 'LEAVE_EDIT_MODE';

export const addItem = (key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan) => {
  return { type: ADD_ITEM, data: { key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } }
}

export const updateItem = (key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan) => {
  return { type: UPDATE_ITEM, data: { key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } }
}

export const deleteItem = key => {
  return { type: DELETE_ITEM, data: { key } }
}

export const enterEdit = key => {
  return { type: ENTER_EDIT_MODE, data: { key } }
}

export const leaveEdit = () => {
  return { type: LEAVE_EDIT_MODE }
}