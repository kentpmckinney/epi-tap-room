import reducer from '../reducers';

describe('reducer tests', () => {

  test('ADD_ITEM', () => {
    const action = { type: 'ADD_ITEM', name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 };
    const state = reducer([], action);
    expect(state).toEqual([{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }]);
  });

  test('UPDATE_ITEM', () => {
    let state = [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }];
    const action = { type: 'UPDATE_ITEM', name: 'test3', brand: 'test2', pricePerPint: 5.00, alcoholContent: 5.0, pintsRemaining: 120, isGlutenFree: true, isVegan: true, key: 1 };
    state = reducer(state, action);
    expect(state).toEqual([{ name: 'test3', brand: 'test2', pricePerPint: 5.00, alcoholContent: 5.0, pintsRemaining: 120, isGlutenFree: true, isVegan: true, key: 1 }]);
  });

  test('DELETE_ITEM', () => {
    let state = [{ name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 }];
    const action = { type: 'DELETE_ITEM', key: 1 };
    state = reducer(state, action);
    expect(state).toEqual([]);
  });

});