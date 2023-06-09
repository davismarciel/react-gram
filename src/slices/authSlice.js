/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user || null,
  error: false,
  success: false,
  loading: false,
};

// Register an user and sign in
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
  const data = await authService.register(user);

  // Check for errors
  if (data.errors) {
    return thunkApi.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Sign in
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
  const data = await authService.login(user);

  // Check for errors
  if (data.errors) {
    return thunkApi.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
