import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const addToCart = createAsyncThunk(
  'addToCart',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endpoints.cart, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.data = null;
      });
  },
});

export const addToCartActions = addToCartSlice.actions;
export default addToCartSlice.reducer;
