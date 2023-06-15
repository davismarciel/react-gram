/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get user details to fill user form
export const profile = createAsyncThunk('auth/profile', async (user, thunkApi) => {
  const { token } = thunkApi.getState().auth.user;
  const data = await userService.profile(user, token);

  // Check for errors
  if (data.errors) {
    return thunkApi.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
