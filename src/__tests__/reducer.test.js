import reducer from '../reducers';
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ENTER_EDIT_MODE, LEAVE_EDIT_MODE } from '../actions';

describe('reducer tests', () => {

  test('ADD_ITEM', () => {
    const action = { type: ADD_ITEM, data: { name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 } };
    const state = reducer({ kegReducer: [], editReducer: { key: null } }, action);
    expect(state).toEqual({ kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }], editReducer: { key: null } });
  });

  test('UPDATE_ITEM', () => {
    let state = { kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }], editReducer: { key: null } };
    const action = { type: UPDATE_ITEM, data: { name: 'test3', brand: 'test2', pricePerPint: 5.00, alcoholContent: 5.0, pintsRemaining: 120, isGlutenFree: true, isVegan: true, key: 1 } };
    state = reducer(state, action);
    expect(state).toEqual({ kegReducer: [{ name: 'test3', brand: 'test2', pricePerPint: 5.00, alcoholContent: 5.0, pintsRemaining: 120, isGlutenFree: true, isVegan: true, key: 1 }], editReducer: { key: null } });
  });

  test('DELETE_ITEM', () => {
    let state = { kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }], editReducer: { key: null } };
    const action = { type: DELETE_ITEM, data: { key: 1 } };
    state = reducer(state, action);
    expect(state).toEqual({ kegReducer: [], editReducer: { key: null } });
  });

  test('ENTER_EDIT_MODE', () => {
    let state = { editReducer: { key: null }, kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }] };
    const action = { type: ENTER_EDIT_MODE, data: { key: 1 } };
    state = reducer(state, action);
    expect(state).toEqual({ editReducer: { key: 1 }, kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }] });
  });

  test('LEAVE_EDIT_MODE', () => {
    let state = { editReducer: { key: 1 }, kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }] };
    const action = { type: LEAVE_EDIT_MODE };
    state = reducer(state, action);
    expect(state).toEqual({ editReducer: { key: null }, kegReducer: [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }] });
  });

});