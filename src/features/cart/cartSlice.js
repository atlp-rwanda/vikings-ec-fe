import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const getCart = createAsyncThunk(
  'cart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(endpoints.cart);
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
