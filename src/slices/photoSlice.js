/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import photoService from '../services/photoService';

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getUserPhotos = createAsyncThunk(
  'photo/get',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    const data = await photoService.getUserPhotos(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const photoSlice = createSlice({
  name: 'photo/userPhotos',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        // Adding photos to array
        state.photos.unshift(state.photo);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = 'Photo shared successfully';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.photo = {};
        state.loading = false;
        state.user = null;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
