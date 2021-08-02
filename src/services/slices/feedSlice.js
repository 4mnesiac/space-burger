import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  orders: [],
  total: null,
  totalToday: null,
  wsConnected: false,
  hasError: null,
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true
      state.hasError = null
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false
      state.hasError = action.payload
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false
    },
    wsGetMessage: (state, action) => {
      const { orders, total, totalToday, success } = action.payload
      if (!success) {
        state.hasError = true
        return
      }
      state.orders = orders
      state.total = total
      state.totalToday = totalToday
    },
  },
})

export default feedSlice.reducer
export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = feedSlice.actions
