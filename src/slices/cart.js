import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { productApi } from '../__fakeApi__/productApi';

const initialState = {
  products: [],
  cart: {}
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts(state, action) {
      const id = action.payload;
      const productData = state.products.find((product) => product.id === id);
      const cartQtyById = state.cart[id]?.cartQty || 0;
      state.cart = {
        ...state.cart,
        [id]: { ...productData, cartQty: cartQtyById ? cartQtyById + 1 : 1 }
      };
    },

    deleteProduct(state, action) {
      const id = action.payload;
      delete state.cart[id];
    },

    setCartProducts(state, action) {
      const products = action.payload;
      state.products = products;
    },

    incrementProduct(state, action) {
      const id = action.payload;
      const cartQtyById = state.cart[id]?.cartQty || 0;
      state.cart = {
        ...state.cart,
        [id]: { ...state.cart[id], cartQty: cartQtyById + 1 }
      };
    },

    decrementProduct(state, action) {
      const id = action.payload;
      const cartQtyById = state.cart[id]?.cartQty || 0;

      if (cartQtyById === 1) {
        delete state.cart[id];
      } else {
        state.cart = {
          ...state.cart,
          [id]: { ...state.cart[id], cartQty: cartQtyById - 1 }
        };
      }
    },

    submitCart: (state, action) => {
      state.cart = action.payload;
    }
  }
});

export const { reducer } = slice;

export const addProduct = (id) => async (dispatch) => {
  dispatch(slice.actions.addProducts(id));
};

export const fetchProducts = () => async (dispatch) => {
  const data = await productApi.getProducts();
  toast.success('Fetched latest batch of products');
  dispatch(slice.actions.setCartProducts(data));
};

export const incrementPerProductCartQty = (id) => async (dispatch) => {
  toast.success('Cart product quantity is updated.');
  dispatch(slice.actions.incrementProduct(id));
};

export const dncrementPerProductCartQty = (id) => async (dispatch) => {
  toast.success('Cart product quantity is updated.');
  dispatch(slice.actions.decrementProduct(id));
};

export const deletePerProduct = (id) => async (dispatch) => {
  dispatch(slice.actions.deleteProduct(id));
};

export const checkout = () => async (dispatch) => {
  toast.success('Your Order is placed successfully, Redirecting back to products');
  dispatch(slice.actions.submitCart({}));
};
export default slice;
