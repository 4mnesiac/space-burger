import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'
import socketMiddleware from './web-socket/middleware/feed-socket-middleware'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware()),
  devTools: true,
})

export default store
