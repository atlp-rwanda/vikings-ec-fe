import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const getProductRatings = createAsyncThunk(
  'getRatings/fetchRatings',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`${endpoints.product}/${productId}/ratings`);
      return response.data.ratings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  ratings: null,
  isLoading: false,
};

export const getRatingsSlice = createSlice({
  name: 'getRatings',
  initialState,
  extraReducers: {
    [getProductRatings.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductRatings.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.ratings = payload;
    },
    [getProductRatings.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default getRatingsSlice.reducer;
