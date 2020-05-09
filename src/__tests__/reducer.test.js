import reducer from '../reducers';

describe('reducer tests', () => {

  test('ADD_ITEM', () => {
    const action = { type: 'ADD_ITEM', payload: { name: 'test' } };
    const state = reducer([], action);
    expect(state).toEqual([{ name: 'test' }]);
  });

});