import * as actions from './slices'
import * as types from './constants'

describe('Action creators', () => {
  it('should create an action with correct price', () => {
    const price = 145600;

        // Эталонный экшен
    const expectedAction = {
      type: types.SET_PRICE,
      price
    }
        
        // Проверяем экшены на равенство
    expect(actions.setPrice(price)).toEqual(expectedAction)
  })
})