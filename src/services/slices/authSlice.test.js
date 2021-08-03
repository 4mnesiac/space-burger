import { enableFetchMocks } from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import authReducer, { initialState, getUser, updateUser, register, logout, login } from './authSlice'

enableFetchMocks()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async authSlice reducers', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  // getUser
  it('should return correct fulfilled getUser response', () => {
    const payload = { success: true, user: { name: 'test', email: 'test' } }
    fetch.mockResponse(JSON.stringify(payload))

    const store = mockStore(() => initialState)

    return store.dispatch(getUser()).then((res) => {
      expect(res.type).toEqual('auth/getUser/fulfilled')
      expect(res.payload).toEqual(payload)
    })
  })
  it('should return correct rejected getUser response', () => {
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(getUser()).then((res) => {
      expect(res.type).toEqual('auth/getUser/rejected')
    })
  })
  // updateUser
  it('should return correct fulfilled updateUser action', () => {
    const expectedActionType = 'auth/updateUser/fulfilled'
    const store = mockStore(initialState)
    const form = { name: 'test', email: 'example@test.ru', password: 'test' }
    const payload = { success: true, user: { ...form } }
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(updateUser(form)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload.user)
      expect(res.meta.arg).toEqual(form)
    })
  })
  it('should return correct rejected updateUser action', () => {
    const expectedActionType = 'auth/updateUser/rejected'
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(updateUser()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // register
  it('should return correct fulfilled register action', () => {
    const expectedActionType = 'auth/register/fulfilled'
    const store = mockStore(initialState)
    const form = { name: 'test', email: 'example@test.ru', password: 'test' }
    const payload = { success: true, user: { ...form } }
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(register(form)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload.user)
      expect(res.meta.arg).toEqual(form)
    })
  })
  it('should return correct rejected register action', () => {
    const expectedActionType = 'auth/register/rejected'
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(register()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // logout
  it('should return correct fulfilled logout action', () => {
    const expectedActionType = 'auth/logout/fulfilled'
    const store = mockStore(initialState)
    const payload = { success: true }
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(logout()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
    })
  })
  it('should return correct rejected logout action', () => {
    const expectedActionType = 'auth/logout/rejected'
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(logout()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
  // login
  it('should return correct fulfilled login action', () => {
    const expectedActionType = 'auth/login/fulfilled'
    const store = mockStore(initialState)
    const form = { email: 'example@test.ru', password: 'test' }
    const payload = { success: true, user: { ...form } }
    fetch.mockResponse(JSON.stringify(payload))

    return store.dispatch(login(form)).then((res) => {
      expect(res.type).toEqual(expectedActionType)
      expect(res.payload).toEqual(payload)
      expect(res.meta.arg).toEqual(form)
    })
  })
  it('should return correct rejected login action', () => {
    const expectedActionType = 'auth/login/rejected'
    fetch.mockReject(new Error('fake error message'))

    const store = mockStore(initialState)

    return store.dispatch(login()).then((res) => {
      expect(res.type).toEqual(expectedActionType)
    })
  })
})
