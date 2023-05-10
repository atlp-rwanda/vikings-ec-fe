import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';


export const getWishList = createAsyncThunk(
  'wishedProducts/fetchList',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${endpoints.users}/${userId}/product-wishes`)
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

export const getWishlistSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [getWishList.pending]: (state) => {
      state.isLoading = true;
    },
    [getWishList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data.wish;
    },
    [getWishList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    'product/resetErrorMessage': (state) => {
      state.errorMessage = null;
    },
  },
});

export const getWishedProductsActions = (state) => state.product.wishedProducts;
export default getWishlistSlice.reducer;
