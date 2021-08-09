import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { resetPasswordApi, forgotPasswordApi } from '../api'

interface IinitialState {
  isLoading: boolean,
  hasError: boolean,
  success: boolean,
  errorMessage?: string,
}
type Tform = {
  password: string,
  token: string
}
export const initialState: IinitialState = {
  isLoading: false,
  hasError: false,
  success: false,
  errorMessage: '',
}

export const forgotPassword = createAsyncThunk('password/forgot', async (email: string) => {
  const res = await forgotPasswordApi(email)
  if (res.success) {
    localStorage.setItem('emailConfirmationSended', 'true')
  } else {
    throw new Error(res.message)
  }
  return res
})
export const resetPassword = createAsyncThunk('password/reset', async (form: Tform) => {
  const res = await resetPasswordApi(form)
  if (!res.success) {
    throw new Error(res.message)
  } 
  return res
})

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.errorMessage = ''
        state.isLoading = true
        state.hasError = false
        state.success = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.errorMessage = action.error.message
        state.isLoading = false
        state.hasError = true
        state.success = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.errorMessage = ''
        state.isLoading = false
        state.hasError = false
        state.success = true
      })
      .addCase(forgotPassword.pending, (state) => {
        state.errorMessage = ''
        state.isLoading = true
        state.hasError = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.errorMessage = action.error.message
        state.isLoading = false
        state.hasError = true
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.errorMessage = ''
        state.isLoading = false
        state.hasError = false
      })
  },
})

export default passwordSlice.reducer
