import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       productId: 11,
  //   productIsbn:9780743273565
  //       productName: 'The Gatsby',
  //       unitPrice: 100,
  //       productType:Music
  // rentPerDay:11
  // minRentDays

  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload=newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload=pizzaId
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addItem, deleteItem, clearCart } = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalPrice = (state) =>
  state.cart.cart
    .reduce((acc, product) => {
      if (product.purchaseType === "PURCHASE") {
        return acc + product.unitPrice;
      } else if (product.purchaseType === "RENT") {
        return acc + product.rentPerDay * product.minRentDays;
      }
      return acc;
    }, 0)
    .toFixed(2);

export const getTotalLength = (state) => state.cart.cart.length;

export const isPresentInCart = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.unitPrice ?? 0;
