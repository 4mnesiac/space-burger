import feedReducer, {
  initialState,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
} from './feedSlice'

// проверка синхронных экшенов
describe('check feed actions', () => {
  it('should return correct wsConnectionSuccess action type', () => {
    const expectedAction = {
      type: 'feed/wsConnectionSuccess',
      payload: undefined,
    }
    expect(wsConnectionSuccess()).toEqual(expectedAction)
  })
  it('should return correct wsConnectionError action type', () => {
    const expectedAction = {
      type: 'feed/wsConnectionError',
      payload: undefined,
    }
    expect(wsConnectionError()).toEqual(expectedAction)
  })
  it('should return correct wsConnectionClosed action', () => {
    const expectedAction = {
      type: 'feed/wsConnectionClosed',
      payload: undefined,
    }
    expect(wsConnectionClosed()).toEqual(expectedAction)
  })
  it('should return correct wsGetMessage action', () => {
    const payload = { success: true, orders: ['test orders'], total: 120, totalToday: 12 }
    const expectedAction = {
      type: 'feed/wsGetMessage',
      payload: payload,
    }
    expect(wsGetMessage(payload)).toEqual(expectedAction)
  })
})

// проверка синхронных редюсеров
describe('check feed reducers', () => {
  it('should turn connection status to open', () => {
    const reducer = feedReducer(initialState, wsConnectionSuccess())
    const result = { ...initialState, wsConnected: true, hasError: null }
    expect(reducer).toEqual(result)
  })
  it('should turn connection status to closed', () => {
    const reducer = feedReducer(initialState, wsConnectionClosed())
    const result = { ...initialState, wsConnected: false }
    expect(reducer).toEqual(result)
  })
  it('should return error status and payload', () => {
    const reducer = feedReducer(initialState, wsConnectionError('error message'))
    const result = { ...initialState, wsConnected: false, hasError: 'error message' }
    expect(reducer).toEqual(result)
  })
  it('shold recieve message and put to store', () => {
    const reducer = feedReducer(
      initialState,
      wsGetMessage({ orders: ['test websocket message'], success: true, total: 120, totalToday: 12 }),
    )
    const result = { ...initialState, orders: ['test websocket message'], total: 120, totalToday: 12 }
    expect(reducer).toEqual(result)
  })
})
