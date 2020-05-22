import { ENTER_EDIT_MODE, LEAVE_EDIT_MODE, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './types';

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