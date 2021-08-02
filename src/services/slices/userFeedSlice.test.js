import userFeedReducer, {
  initialState,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
} from './userFeedSlice'

// проверка синхронных экшенов
describe('check userFeed actions', () => {
  it('should return correct wsConnectionSuccess action', () => {
    const expectedAction = {
      type: 'userFeed/wsConnectionSuccess',
      payload: undefined,
    }
    expect(wsConnectionSuccess()).toEqual(expectedAction)
  })
  it('should return correct wsConnectionError action', () => {
    const expectedAction = {
      type: 'userFeed/wsConnectionError',
      payload: 'test error',
    }
    expect(wsConnectionError('test error')).toEqual(expectedAction)
  })
  it('should return correct wsConnectionClosed action', () => {
    const expectedAction = {
      type: 'userFeed/wsConnectionClosed',
      payload: undefined,
    }
    expect(wsConnectionClosed()).toEqual(expectedAction)
  })
  it('should return correct wsGetMessage action', () => {
    const payload = { success: true, orders: ['test orders'] }
    const expectedAction = {
      type: 'userFeed/wsGetMessage',
      payload: payload,
    }
    expect(wsGetMessage(payload)).toEqual(expectedAction)
  })
})

// проверка синхронных редюсеров
describe('check userFeed reducers', () => {
  it('should turn connection status to open', () => {
    const reducer = userFeedReducer(initialState, wsConnectionSuccess())
    const result = { ...initialState, wsConnected: true, hasError: null }
    expect(reducer).toEqual(result)
  })
  it('should turn connection status to closed', () => {
    const reducer = userFeedReducer(initialState, wsConnectionClosed())
    const result = { ...initialState, wsConnected: false }
    expect(reducer).toEqual(result)
  })
  it('should return error status and payload', () => {
    const reducer = userFeedReducer(initialState, wsConnectionError('error message'))
    const result = { ...initialState, wsConnected: false, hasError: 'error message' }
    expect(reducer).toEqual(result)
  })
  it('shold recieve message and put to store', () => {
    const reducer = userFeedReducer(initialState, wsGetMessage({ orders: ['test websocket message'], success: true }))
    const result = { ...initialState, orders: ['test websocket message'] }
    expect(reducer).toEqual(result)
  })
})
