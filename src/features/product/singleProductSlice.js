import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const singleProduct = createAsyncThunk(
  'singleProduct/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/products/${productId}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  product: [],
  isLoading: false,
};

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  extraReducers: {
    [singleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [singleProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
    },
    [singleProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default singleProductSlice.reducer;
