import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getProductList = createAsyncThunk(
  'products/fetchList',
  async ({ pageNumber, name, category, minPrice, maxPrice, expireDate }, { rejectWithValue }) => {
    try {
      let url = `/products?page=${pageNumber}&limit=${20}`;
      if (name) url += `&name=${name}`;
      if (category) url += `&category=${category}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;
      if (expireDate) url += `&expireDate=${expireDate}`;
      const response = await axios.get(url);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const initialState = {
  productsList: [],
  isLoading: false,
  errorMessage: null,
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
    'product/resetErrorMessage': (state) => {
      state.errorMessage = null;
    },
  },
});

export const getProductsActions = (state) => state.product.products;
export default getProductsSlice.reducer;
