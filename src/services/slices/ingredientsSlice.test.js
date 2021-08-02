import { enableFetchMocks } from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ingredientsReducer, {
  initialState,
  setIngredientToShow,
  resetIngredientToShow,
  getIngredients,
} from './ingredientsSlice'

enableFetchMocks()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const testItem = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
}

// проверка синхронных экшенов
describe('Action creator', () => {
  it('should be set item to show in modal', () => {
    // Эталонный экшен
    const expectedAction = {
      type: 'ingredients/setIngredientToShow',
      payload: testItem,
    }
    expect(setIngredientToShow(testItem)).toEqual(expectedAction)
  })

  it('should reset item', () => {
    const expectedAction = {
      type: 'ingredients/resetIngredientToShow',
      payload: undefined,
    }
    expect(resetIngredientToShow()).toEqual(expectedAction)
  })
})

// check reducers
describe('ingredient reducer', () => {
  it('should return the initial state', () => {
    const reducer = ingredientsReducer(undefined, {})
    expect(reducer).toEqual(initialState)
  })

  it('should set the ingredient to show in modal', () => {
    const item = { _id: '60d3b41abdacab0026a733c8', name: 'Булка' }
    const reducer = ingredientsReducer(initialState, setIngredientToShow(item))
    const result = { ...initialState, ingredientToShow: item }
    expect(reducer).toEqual(result)
  })
  it('should reset the ingredient already showed in modal', () => {
    const reducer = ingredientsReducer(
      { ...initialState, ingredientToShow: { _id: '60d3b41abdacab0026a733c8', name: 'Булка' } },
      resetIngredientToShow(),
    )
    const result = { ...initialState, ingredientToShow: {} }
    expect(reducer).toEqual(result)
  })
})

// check async reducers
describe('async reducers', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  // проверяем корректное fulfilled завершение запроса и получение данных
  it('should return correct fulfilled action and add ingredients to state', () => {
    fetch.mockResponse(JSON.stringify({ success: true, data: [testItem] }))

    const store = mockStore(initialState)

    return store.dispatch(getIngredients()).then((res) => {
      expect(res.type).toEqual('ingredients/getIngredients/fulfilled')
      expect(res.payload).toEqual([testItem])
    })
  })
  // проверяем корректный reject
  it('should return correct rejected action', () => {
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(getIngredients()).then((res) => {
      expect(res.type).toEqual('ingredients/getIngredients/rejected')
    })
  })
})
