import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        const tempCart = { ...action.payload, quantity: 1 };
        state.cart.push(tempCart);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      console.log(state.cart);
    },
    clearCart: (state, action) => {},
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
