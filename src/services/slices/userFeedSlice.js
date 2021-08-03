import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  orders: [],
  wsConnected: false,
  hasError: null,
}

const userFeedSlice = createSlice({
  name: 'userFeed',
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
      const { orders, success } = action.payload
      if (!success) {
        state.hasError = true
        return
      }
      state.orders = orders
    },
  },
})

export default userFeedSlice.reducer
export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = userFeedSlice.actions
