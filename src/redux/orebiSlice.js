import { createSlice } from "@reduxjs/toolkit";

 

const initialState = {
  userInfo: [],
  products: [],
  totalAmount: 0,  // Add totalAmount to the initial state
  walletAddress: null, // Add walletAddress to the initial state

 };

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.products.push(action.payload);
    },
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.totalAmt += action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        state.totalAmt += item.price;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        state.totalAmt -= item.price;
      }
    },
    deleteItem: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload
      );
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      state.totalAmt -= item.price * item.quantity;
    },
    
    resetCart: (state) => {
      state.products = [];
      state.totalAmt = 0;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    calculateTotalAmount: (state) => {
      state.totalAmount = state.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }, 
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },  
    },
});

export const {
  addToCart,
  addItem,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  setTotalAmounts,
  calculateTotalAmount,
  setWalletAddress,
} = orebiSlice.actions;
export default orebiSlice.reducer;