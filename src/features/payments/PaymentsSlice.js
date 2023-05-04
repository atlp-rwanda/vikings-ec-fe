import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const createPaymentsSession = createAsyncThunk(
  'pay/createCheckoutSession',
  async (_, { rejectWithValue }) => {
    try {
      const url = `${endpoints.pay}`;
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: null,
  isLoading: false,
};

export const paymentCheckoutSlice = createSlice({
  name: 'pay',
  initialState,
  extraReducers: {
    [createPaymentsSession.pending]: (state) => {
      state.isLoading = true;
    },
    [createPaymentsSession.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [createPaymentsSession.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const createPaymentsActions = (state) => state.data.url;
export default paymentCheckoutSlice.reducer;