import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/products/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default updateProductSlice.reducer;