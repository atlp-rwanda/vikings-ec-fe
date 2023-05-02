import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const changeStatus = createAsyncThunk(
  'changeStatus',
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/users/${id}`, {
        ...payload,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const changeUserStatusSlice = createSlice({
  name: 'changeStatus',
  initialState: {
    data: null,
    isLoading: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(changeStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export const changeStatusActions = (state) => state.changeStatus.data;
export default changeUserStatusSlice.reducer;