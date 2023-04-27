import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const deleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState: {
    data: null,
    isLoading: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default deleteProductSlice.reducer;