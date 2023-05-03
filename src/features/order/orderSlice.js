import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const getOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const url = `${endpoints.order}/${orderId}`;
      const response = await axios.get(url);
      const orderedProducts = [];
      for (let i = 0; i < response.data.order.products.length; i++) {
        const res = await axios.get(`${endpoints.product}/${response.data.order.products[i].productId}`);
        res.data.order = response.data.order.products[i];
        res.data.totalPrice = response.data.order.fullPrice;
        orderedProducts.push(res.data);
      }
      return orderedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: null,
  isLoading: false,
};

export const getOrderDetailsSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetails.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getOrderDetails.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default getOrderDetailsSlice.reducer;