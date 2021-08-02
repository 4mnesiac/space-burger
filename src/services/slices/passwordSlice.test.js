import { initialState, forgotPassword, resetPassword } from './passwordSlice'
import { enableFetchMocks } from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

enableFetchMocks()
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const testItem = {
  name: 'test',
  email: 'test',
}

// проверка асинхронных редюсеров
describe('check passwordSlice async reducers', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  // forgotPassword
  // проверяем корректное fulfilled завершение запроса и получение данных
  it('should return correct fulfilled forgotPassword action and data', () => {
    const payload = { success: true, user: testItem }
    const email = { email: 'example@test.ru' }
    const expectedActionType = 'password/forgot/fulfilled'
    const store = mockStore(initialState)
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(forgotPassword(email)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
      expect(res.meta.arg).toEqual(email)
    })
  })
  it('should return correct rejected forgotPassword action', () => {
    const expectedActionType = 'password/forgot/rejected'
    const store = mockStore(initialState)
    const email = { email: 'example@test.ru' }
    fetch.mockReject(new Error('fake error message'))

    return store.dispatch(forgotPassword(email)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // resetPassword
  it('should return correct fulfilled resetPassword action and data', () => {
    const payload = { success: true, user: testItem }
    const form = { email: 'example@test.ru', token: 'test' }
    const expectedActionType = 'password/reset/fulfilled'
    const store = mockStore(initialState)
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(resetPassword(form)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
      expect(res.meta.arg).toEqual(form)
    })
  })
  it('should return correct rejected resetPassword action', () => {
    const expectedActionType = 'password/reset/rejected'
    const store = mockStore(initialState)
    const form = { email: 'example@test.ru', token: 'test' }
    fetch.mockReject(new Error('fake error message'))

    return store.dispatch(resetPassword(form)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
})
