import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";
import authReducer from './slices/authSlice';
import passwordReducer from './slices/passwordSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    cart: cartReducer,
    modal: modalReducer,
    auth: authReducer,
    password: passwordReducer
  },
  devTools: true,
});

export default store;

