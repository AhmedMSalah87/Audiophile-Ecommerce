import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single cart item
export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: { mobile: string; tablet: string; desktop: string };
}

// Define the type for the cart state
interface CartState {
  cartItems: CartItem[];
}

// Initial state with proper typing
const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload` and we omit type of quantity at first because it will be add after adding item
    addItems: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload });
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    increaseItemQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    decreaseItemQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        //ensure quantity if go below 1 to remove item from cart
        if (item.quantity <= 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        }
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addItems,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
