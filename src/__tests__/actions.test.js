import * as c from '../reducers';

describe('action creator tests', () => {

  test('actionAddItem', () => {
    const action = c.actionAddItem(name = 'test', brand = 'test', pricePerPint = 0.00, alcoholContent = 0.0, pintsRemaining = 124, isGlutenFree = false, isVegan = false, key = 1);
    expect(action).toEqual({ type: c.ADD_ITEM, data: { name: 'test', brand: 'test', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false, key: 1 } });
  });



});