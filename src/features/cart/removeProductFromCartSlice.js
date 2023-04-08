import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const removeFromCart = createAsyncThunk(
  'removeFromCart',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${endpoints.cart}/${payload.id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const removeFromCartSlice = createSlice({
  name: 'removeFromCart',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.data = null;
      });
  },
});

export const removeFromCartActions = removeFromCart.actions;
export default removeFromCartSlice.reducer;
