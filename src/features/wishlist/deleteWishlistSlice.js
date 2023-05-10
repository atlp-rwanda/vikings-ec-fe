import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const deleteWishlist = createAsyncThunk(
  'wishlist/deleteWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${endpoints.wishlist}/${productId}/product-wishes`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const deleteWishlistSlice = createSlice({
  name: 'deleteWishlist',
  initialState: {
    data: null,
    isLoading: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(deleteWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(deleteWishlist.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export default deleteWishlistSlice.reducer;