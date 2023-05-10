import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getSales = createAsyncThunk('sales', async ({ page }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/sales?limit=${10}&page=${page}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getSalesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
    pagination: {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: '10',
      totalPages: 1,
      currentPage: '1',
    },
  },
  reducers: {
    updateStatusField(state, { payload }) {
      if (state.data.sellerSales) {
        state.data.sellerSales = state.data.sellerSales.map((each) => {
          if (payload.saleId !== each.id) {
            return each;
          }
          return { ...each, [payload.field]: payload.value };
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSales.pending,
        (state) => {
          state.isLoading = true;
        },
      )
      .addCase(
        getSales.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.data = payload;
          state.error = null;
          state.pagination = payload.meta;
        },
      )
      .addCase(getSales.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const getSalesActions = getSalesSlice.actions;
export default getSalesSlice.reducer;
