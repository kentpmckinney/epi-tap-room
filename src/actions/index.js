const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export const actionAddItem = (key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan) => {
  return { type: ADD_ITEM, data: { key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } }
}

export const actionUpdateItem = (key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan) => {
  return { type: UPDATE_ITEM, data: { key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } }
}

export const actionDeleteItem = () => {
  return { type: DELETE_ITEM, data: { key } }
}