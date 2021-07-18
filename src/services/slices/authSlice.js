import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getUserApi,
  loginRequestApi,
  logoutRequestApi,
  refreshExpiredTokenApi,
  registerRequestApi,
  updateUserApi,
} from '../api'
import { setCookie } from 'utils/cookie'

export const login = createAsyncThunk('auth/login', async (form) => {
  const res = await loginRequestApi(form)
  if (res && res.success) {
    setCookie('token', res.accessToken)
    localStorage.setItem('token', res.refreshToken)
    localStorage.setItem('userName', res.user.name)
    console.log('Login success, ' + res.user.name)
    return res
  } else {
    return Promise.reject(res.message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await logoutRequestApi()
  if (res && res.success) {
    setCookie('token', '')
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    console.log('logout success')
  } else {
    return Promise.reject(res.message)
  }
})

export const register = createAsyncThunk('auth/register', async (form) => {
  const res = await registerRequestApi(form)
  if (res && res.success) {
    console.log('register success' + res.user)
    return res
  } else {
    return Promise.reject(res.message)
  }
})

export const updateUser = createAsyncThunk('auth/update-user', async (form) => {
  try {
    const res = await updateUserApi(form)
    debugger
    if (res && res.success) {
      localStorage.setItem('userName', res.user.name)
      console.log('update success ', res)
      return res.user
    }
    throw new Error(res)
  } catch (error) {
    debugger
    if (error.message === 'jwt expired') {
      return await refreshExpiredTokenApi(updateUserApi, form)
    }
    console.log(`Catched and hadled error: "${error}"`)
    return Promise.reject(error.message)
  }
})

export const getUser = createAsyncThunk('auth/getUser', async () => {
  try {
    const response = await getUserApi()
    if (response && response.success) {
      console.log(response)
      localStorage.setItem('userName', response.user.name)
      return response
    }
    throw new Error(response.message)
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log(error.message)
      return await refreshExpiredTokenApi(getUserApi, null)
    }
    console.log(`Catched and hadled error: "${error.message}"`)
    return Promise.reject(error.message)
  }
})

const initialState = {
  isAuthorized: false,
  user: {
    name: '',
    email: '',
  },
  isLoading: false,
  hasError: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.hasError = false
        state.isAuthorized = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.isAuthorized = false
        state.user = initialState.user
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.hasError = false
        state.isAuthorized = true
        state.isLoading = false
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false
        state.hasError = false
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false
        state.isLoading = false
        state.hasError = false
        state.user = initialState.user
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        state.isAuthorized = true
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
        // state.user = initialState.user
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthorized = true
        state.isLoading = false
        state.hasError = false
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.hasError = false
      })
  },
})

export default authSlice.reducer
