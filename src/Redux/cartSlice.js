// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
// Initial state
const initialState = {
  cart: {},
  loading: false,
  error: null,
  user: [],
  users: [],
};

// Helper function to save the cart to localStorage
const saveCartToLocalStorage = (cart, users, user) => {
  const updatedUser = { ...user, cart };
  const userIndex = users.findIndex((user) => user.id === updatedUser.id);
  users[userIndex] = updatedUser;
  localStorage.setItem("users", JSON.stringify(users));
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addItem: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.cart.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.cartItems.push({ ...product, quantity });
      }

      // Update totals
      state.cart.totalItems += quantity;
      state.cart.totalPrice += parseInt(product.new_price) * parseInt(quantity);

      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cart, state.users, state.user);
    },
    removeItem: (state, action) => {
      if (!state.cart) return; // Check if cart exists

      const { productId } = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== productId
        );
        state.cart.totalItems -= existingItem.quantity;
        state.cart.totalPrice -= existingItem.price * existingItem.quantity;

        // Save updated cart to localStorage
        saveCartToLocalStorage(state.cart, state.users, state.user);
      }
    },
    clearCart: (state) => {
      if (!state.cart) return; // Check if cart exists

      state.cart.cartItems = [];
      state.cart.totalItems = 0;
      state.cart.totalPrice = 0;

      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cart, state.users, state.user);
    },
  },
});

// Export actions
export const { addItem, removeItem, clearCart, setCart, setUsers, setUser } =
  cartSlice.actions;

export default cartSlice.reducer;
