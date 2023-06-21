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
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.getUserPhotos(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const like = createAsyncThunk(
  'photo/like',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.like(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token,
    );
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getPhoto = createAsyncThunk(
  'photo/getPhoto',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.user;

    const data = await photoService.getPhoto(id, token);

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
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;

        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = 'Photo deleted successfully!';
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.photo = {};
        state.loading = false;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;

        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return photo.title === action.payload.photo.title;
          }

          return photo;
        });

        state.message = 'Edit completed';
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.photo = {};
        state.loading = false;
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }

          return photo;
        });

        state.message = 'Edit completed';
      })
      .addCase(like.rejected, (state, action) => {
        state.error = action.payload;
        state.photo = {};
        state.loading = false;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
