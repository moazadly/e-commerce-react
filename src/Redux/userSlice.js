// redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for Signup
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const id = JSON.parse(localStorage.getItem("id")) + 1 || 1;

      localStorage.setItem("id", JSON.stringify(id));

      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email already exists
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        throw new Error("Email already exists");
      }
      const cart = {
        cartItems: [],
        totalPrice: 0,
        totalItems: 0,
      };
      // Add new user to localStorage
      const newUser = { name, email, password, id, cart };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find user by email and password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (!user) {
        throw new Error("Invalid credentials");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  users: null,
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("currentUser", JSON.stringify({}));
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Signup cases
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = JSON.parse(localStorage.getItem("currentUser"));
        state.users = JSON.parse(localStorage.getItem("users"));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = JSON.parse(localStorage.getItem("currentUser"));
        state.users = JSON.parse(localStorage.getItem("users"));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout } = userSlice.actions;

export default userSlice.reducer;
