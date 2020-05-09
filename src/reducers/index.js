const reducer = (state = [], action) => {
  const { type, key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } = action;
  switch (type) {
    case 'ADD_ITEM':
      return [{ key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan }, ...state];
    case 'UPDATE_ITEM':
      return state.map(item => item.key === key ? { key, name, brand, pricePerPint, alcoholContent, pintsRemaining, isGlutenFree, isVegan } : item);
    case 'DELETE_ITEM':
      return state.filter(item => item.key !== key);
    default:
      return state;
  }
}

export default reducer;