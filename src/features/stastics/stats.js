import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const getStats = createAsyncThunk(
  'stastics/fetchAll',
  async ({ start, end }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/stats?start=${start}&end=${end}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getStatsSlice = createSlice({
  name: 'stastics',
  initialState: {
    data: null,
    isLoading: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default getStatsSlice.reducer;
