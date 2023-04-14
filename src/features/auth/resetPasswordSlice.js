/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${endpoints.resetPassword}/${payload.token}`, { newPassword: payload.newPassword });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    isLoading: false,
    error: null,
  },
  extraReducers: (builer) => {
    builer
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const resetPasswordActions = (state) => state.resetPassword.data;

export default resetPasswordSlice.reducer;
