import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getRecommendedProducts = createAsyncThunk(
  'products/recommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('products/recommended');
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const recommendedProductsSlice = createSlice({
  name: 'product',
  initialState: {
    recommendedProducts: [],
    isLoading: false,
  },
  extraReducers: {
    [getRecommendedProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecommendedProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.recommendedProducts = payload;
    },
    [getRecommendedProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
export default recommendedProductsSlice.reducer;
