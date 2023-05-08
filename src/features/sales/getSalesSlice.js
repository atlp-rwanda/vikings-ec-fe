import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getSales = createAsyncThunk('sales', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/sales');
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
