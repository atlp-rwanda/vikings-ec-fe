/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const addToWishlist = createAsyncThunk('addToWishlist', async (wishlistData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/wishlist/product-wishes', wishlistData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const wishlistSlice = createSlice({
  name: 'addToWishlist',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builer) => {
    builer
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const addToWishlistActions = (state) => state.addToWishlist.data;

export default wishlistSlice.reducer;
