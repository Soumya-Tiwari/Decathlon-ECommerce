import { combineReducers } from '@reduxjs/toolkit';
import { reducer as CartReducer } from '../slices/cart';

const rootReducer = combineReducers({
  cart: CartReducer,
});

export default rootReducer;
