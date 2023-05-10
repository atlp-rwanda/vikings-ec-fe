import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const getBuyerOrders = createAsyncThunk(
  'fetchOrders',
  async ( { page } , { rejectWithValue }) => {
    try {
      const data = await customAxios.get(`/orders?limit=${10}&page=${page}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: {},
  isLoading: false,
  pagination: {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: '10',
    totalPages: 1,
    currentPage: '1',
  },
  error: null,
};

export const orderSlice = createSlice({
  name: 'fetchOrders',
  initialState,
  extraReducers: {
    [getBuyerOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getBuyerOrders.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.pagination = payload.data?.orders?.meta;
    },
    [getBuyerOrders.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
export const getBuyerOrdersActions = orderSlice.actions;
export default orderSlice.reducer;