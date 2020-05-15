import { addItem, updateItem, deleteItem, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions';

describe('action creator tests', () => {

  test('actionAddItem', () => {
    const action = addItem(1, 'test', 'test', 0.00, 0.0, 124, false, false, 1);
    expect(action).toEqual({ type: ADD_ITEM, data: { name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 } });
  });



});