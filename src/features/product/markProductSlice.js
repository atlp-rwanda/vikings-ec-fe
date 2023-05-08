import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const markProduct = createAsyncThunk(
  'markProduct/changingProductAvalablity',
  async ({ productId, body }, { rejectWithValue }) => {
    try {
      const response = await customAxios.put(`${endpoints.product}/${productId}`, body);
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

export const markProductSlice = createSlice({
  name: 'markProduct',
  initialState,
  extraReducers: {
    [markProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [markProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [markProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export default markProductSlice.reducer;
