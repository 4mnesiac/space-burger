import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllOrdersApi, getOrderByIdApi, getUserOrdersApi, refreshExpiredTokenApi, sendOrderApi } from 'services/api'

export const setOrder = createAsyncThunk('order/setOrder', async (ids) => {
  try {
    const response = await sendOrderApi(ids)
    if (response && response.success) {
      console.log(response)
      return response
    }
    throw new Error(response.message)
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log(error.message)
      return await refreshExpiredTokenApi(sendOrderApi, ids)
    }
    console.log(`Catched and hadled error: "${error}"`)
    return Promise.reject(error.message)
  }
})

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  try {
    const response = await getAllOrdersApi()
    if (response && response.success) {
      console.log(response)
      return response
    }
    throw new Error(response.message)
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log(error.message)
      return await refreshExpiredTokenApi(getAllOrdersApi, null)
    }
    console.log(`Catched and hadled error: "${error}"`)
    return Promise.reject(error.message)
  }
})

export const getUserOrders = createAsyncThunk('order/getUserOrders', async () => {
  try {
    const response = await getUserOrdersApi()
    if (response && response.success) {
      console.log(response)
      return response
    }
    throw new Error(response.message)
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log(error.message)
      return await refreshExpiredTokenApi(getUserOrdersApi, null)
    }
    console.log(`Catched and hadled error: "${error.message}"`)
    return Promise.reject(error.message)
  }
})
export const getOrderById = createAsyncThunk('order/getOrderById', async (id) => {
  try {
    const response = await getOrderByIdApi(id)
    if (response && response.success) {
      console.log(response)
      return response
    }
    throw new Error(response.message)
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log(error.message)
      return await refreshExpiredTokenApi(getOrderByIdApi, id)
    }
    console.log(`Catched and hadled error: "${error.message}"`)
    return Promise.reject(error.message)
  }
})

export const initialState = {
  allOrders: [],
  userOrders: [],
  orderToShow: {},
  total: null,
  totalToday: null,
  order: {},
  isLoading: false,
  hasError: false,
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = {}
    },
    setOrderToShow: (state, action) => {
      state.orderToShow = action.payload
    },
    resetOrderToShow: (state) => {
      state.orderToShow = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setOrder.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.isLoading = false
        state.hasError = false
      })
      .addCase(setOrder.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.order = {}
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload.orders
        state.total = action.payload.total
        state.totalToday = action.payload.totalToday
        state.isLoading = false
        state.hasError = false
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload.orders
        state.isLoading = false
        state.hasError = false
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.userOrders = []
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.userToShow = action.payload
        state.isLoading = false
        state.hasError = false
      })
      .addCase(getOrderById.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.userToShow = {}
      })
  },
})

export const { clearOrder, setOrderToShow, resetOrderToShow } = orderSlice.actions
export default orderSlice.reducer
