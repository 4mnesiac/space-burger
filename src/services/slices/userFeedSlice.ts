import { createSlice } from '@reduxjs/toolkit'

interface IinitialState {
  orders: TinitialOrders,
  wsConnected: boolean,
  hasError: boolean,
}
type TinitialOrders = [];


export const initialState: IinitialState = {
  orders: [],
  wsConnected: false,
  hasError: false,
}

const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true
      state.hasError = false
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
      state.hasError = false
      state.orders = orders
    },
  },
})

export default userFeedSlice.reducer
export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = userFeedSlice.actions
