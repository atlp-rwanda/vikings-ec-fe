import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getProductList = createAsyncThunk(
  'products/fetchList',
  async ({ pageNumber }, { rejectWithValue }) => {
    try {
      const url = `/products?page=${pageNumber}&limit=${20}`;
      const response = await axios.get(url);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  productsList: [],
  isLoading: false,
};

export const getProductsSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [getProductList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.productsList = payload;
    },
    [getProductList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const getProductsActions = (state) => state.product.products;
export default getProductsSlice.reducer;
