import { createSlice } from '@reduxjs/toolkit';

import cart from '../data/cart';

const initialState = {
  items: cart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
          },
          size,
          quantity: 1,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.size === size
      );

      if (!item) {
        return;
      }

      item.quantity -= 1;

      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (item) => !(item.product.id === productId && item.size === size)
        );
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

export default cartSlice.reducer;
