import { createSlice } from '@reduxjs/toolkit';
import { getProfile, updateProfile } from '../actions/profileAction';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
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

export const getAllShows = (state) => state.profile.data;
export default profileSlice.reducer;
