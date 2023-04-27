import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../utils/endpoints';
import axios from './api/customAxios';

export const createProduct = createAsyncThunk(
  'createProduct',
  async (createProductData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        Endpoints.createProduct,
        createProductData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createProductSlice = createSlice({
  name: 'createProduct',
  initialState: {
    createdProduct: {},
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.isLoading = true;
      state.createdProduct = {};
      state.error = null;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createdProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [createProduct.rejected]: (state, action) => {
      state.createdProduct = {};
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const createProductActions = (state) => state.createProduct.data;

export default createProductSlice.reducer;
