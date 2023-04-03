import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/users/profile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const getAllShows = (state) => state.data.updateProfile;
export default updateProfileSlice.reducer;
