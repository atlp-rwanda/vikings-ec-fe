/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endpoints.forgotPassword, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    isLoading: false,
    error: null,
  },
  extraReducers: (builer) => {
    builer
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const forgotPasswordActions = (state) => state.forgotPassword.data;

export default forgotPasswordSlice.reducer;
