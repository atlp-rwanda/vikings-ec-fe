import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const getSingleOrder = createAsyncThunk(
  'fetchSingleOrder',
  async ( id , { rejectWithValue }) => {
    try {
      const data = await customAxios.get(`/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: {},
  isLoading: false,
  error: null
};

export const singleOrderSlice = createSlice({
  name: 'fetchSingleOrder',
  initialState,
  extraReducers: {
    [getSingleOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleOrder.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getSingleOrder.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
export const getSingleOrderAction = singleOrderSlice.actions;
export default singleOrderSlice.reducer;