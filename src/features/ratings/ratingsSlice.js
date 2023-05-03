/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const provideRatings = createAsyncThunk('provideRatings', async (reviewsData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/ratings', reviewsData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const provideRatingsSlice = createSlice({
  name: 'provideRatings',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builer) => {
    builer
      .addCase(provideRatings.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(provideRatings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(provideRatings.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const provideRatingsActions = (state) => state.provideRatings.data;

export default provideRatingsSlice.reducer;
