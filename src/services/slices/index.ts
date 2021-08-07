import ingredientsReducer from './ingredientsSlice'
import orderReducer from './orderSlice'
import cartReducer from './cartSlice'
import modalReducer from './modalSlice'
import authReducer from './authSlice'
import passwordReducer from './passwordSlice'
import feedReducer from './feedSlice'
import userFeedReducer from './userFeedSlice'

const rootReducer = {
  ingredients: ingredientsReducer,
  order: orderReducer,
  cart: cartReducer,
  modal: modalReducer,
  auth: authReducer,
  password: passwordReducer,
  feed: feedReducer,
  userFeed: userFeedReducer,
}

export default rootReducer
