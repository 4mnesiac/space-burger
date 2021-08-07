import { enableFetchMocks } from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { TOrder } from 'types/types'
import orderReducer, {
  initialState,
  clearOrder,
  setOrderToShow,
  resetOrderToShow,
  setOrder,
  getOrders,
  getUserOrders,
  getOrderById,
} from './orderSlice'

enableFetchMocks()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


const testItem: TOrder = {
  _id: '60666c42cc7b410027a1a9b1',
  number: 60,
  ingredients: [],
  owner: {name: 'test'},
  status: 'created',
  name: 'test',
  createdAt: Date.now(),
  price: 10
}


// проверка синхронных экшенов
describe('Action creators', () => {
  it('should be set item to show in modal', () => {
    const expectedAction = {
      type: 'order/setOrderToShow',
      payload: testItem,
    }
    expect(setOrderToShow(testItem)).toEqual(expectedAction)
  })

  it('should reset item from modal', () => {
    const expectedAction = {
      type: 'order/resetOrderToShow',
    }
    expect(resetOrderToShow()).toEqual(expectedAction)
  })

  it('should clear order', () => {
    const expectedAction = {
      type: 'order/clearOrder',
    }
    expect(clearOrder()).toEqual(expectedAction)
  })
})

// проверка синхронных редюсеров
describe('order reducers', () => {
  it('should return the initial state', () => {
    const reducer = orderReducer(undefined, {})
    expect(reducer).toEqual(initialState)
  })

  it('should set the order to show in details modal', () => {
    const reducer = orderReducer(initialState, setOrderToShow(testItem))
    const result = { ...initialState, orderToShow: testItem }
    expect(reducer).toEqual(result)
  })
  it('should reset the order already showed in modal', () => {
    const reducer = orderReducer({ ...initialState, orderToShow: testItem }, resetOrderToShow())
    const result = { ...initialState, orderToShow: {} }
    expect(reducer).toEqual(result)
  })
  it('should reset order', () => {
    const reducer = orderReducer({ ...initialState, orderToShow: testItem }, resetOrderToShow())
    const result = { ...initialState, orderToShow: {} }
    expect(reducer).toEqual(result)
  })
})

// проверка асинхронных редюсеров
// достаточно проверить приходящий экшен и мета поля, дальше отрабатывает payloadCreator тулкита
describe('check async reducers', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  // getOrders
  // проверяем корректное fulfilled завершение запроса и получение данных
  it('should return correct fulfilled action and add orders to state', () => {
    const payload = { success: true, allOrders: [testItem] }
    const expectedActionType = 'order/getOrders/fulfilled'
    const store = mockStore(initialState)
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(getOrders()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
    })
  })
  it('should return correct rejected action', () => {
    const expectedActionType = 'order/getOrders/rejected'
    const store = mockStore(initialState)
    fetch.mockReject(new Error('fake error message'))

    return store.dispatch(getOrders()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // setOrder
  it('should be correct setOrder action and response', () => {
    const payload = testItem
    const expectedActionType = 'order/setOrder/fulfilled'
    const store = mockStore(initialState)
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch((setOrder as any)(['1', '2'])).then((res) => {
      // сравнием поля экшена и мета поля тулкита
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
      expect(res.meta.arg).toEqual(['1', '2'])
    })
  })
  it('should return correct rejected setOrder action', () => {
    const store = mockStore(() => initialState)
    const expectedActionType = 'order/setOrder/rejected'
    fetch.mockReject(new Error('fake error message'))

    return store.dispatch(setOrder(['dsa', 'sd'])).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })

  // getUserOrders
  // проверяем корректное fulfilled завершение запроса и получение данных
  it('should return correct action and fulfilled getUserOrders response', () => {
    const payload = { success: true, getUserOrders: [testItem] }
    const store = mockStore(initialState)
    const expectedActionType = 'order/getUserOrders/fulfilled'
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(getUserOrders()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
    })
  })
  it('should return correct rejected status', () => {
    const store = mockStore(initialState)
    const expectedActionType = 'order/getUserOrders/rejected'
    fetch.mockReject(new Error('mock error'))

    return store.dispatch(getUserOrders()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // getOrderById
  // проверяем корректное fulfilled завершение запроса и получение данных
  it('should return correct fulfilled action and response', () => {
    const payload = { success: true, orders: { id: '12' } }
    const store = mockStore(initialState)
    fetch.mockResponse(JSON.stringify(payload))
    const expectedActionType = 'order/getOrderById/fulfilled'
    return store.dispatch(getOrderById('12')).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
      expect(res.meta.arg).toEqual('12')
    })
  })

  it('should return correct rejected getOrderById action', () => {
    fetch.mockReject(new Error('mock error'))

    const store = mockStore(initialState)
    const expectedActionType = 'order/getOrderById/rejected'

    return store.dispatch(getOrderById()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
})
