import { addItem, updateItem, deleteItem, enterEdit, leaveEdit, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ENTER_EDIT_MODE, LEAVE_EDIT_MODE } from '../actions';

describe('action creator tests', () => {

  test('addItem', () => {
    const action = addItem(1, 'test', 'test', 0.00, 0.0, 124, false, false, 1);
    expect(action).toEqual({ type: ADD_ITEM, data: { name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 } });
  });

  test('updateItem', () => {
    const action = updateItem(1, 'test', 'test', 0.00, 0.0, 124, false, false, 1);
    expect(action).toEqual({ type: UPDATE_ITEM, data: { name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 } });
  });

  test('deleteItem', () => {
    const action = deleteItem(1);
    expect(action).toEqual({ type: DELETE_ITEM, data: { key: 1 } });
  });

  test('enterEdit', () => {
    const action = enterEdit(1);
    expect(action).toEqual({ type: ENTER_EDIT_MODE, data: { key: 1 } });
  });

  test('enterEdit', () => {
    const action = leaveEdit();
    expect(action).toEqual({ type: LEAVE_EDIT_MODE });
  });

});