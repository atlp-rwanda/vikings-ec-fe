import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const changeSalesStatus = (createAsyncThunk(
  'changeSalesStatus',
  async ({ payload, saleId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/sales/${saleId}/status`, { ...payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
));

export const changeSalesStatusSlice = createSlice({
  name: 'changeSalesStatus',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeSalesStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeSalesStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(changeSalesStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const changeSalesStatusActions = changeSalesStatusSlice.actions;

export default changeSalesStatusSlice.reducer;
