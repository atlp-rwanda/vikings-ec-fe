import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const updateRole = createAsyncThunk(
  'updateRole',
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/users/${id}`, {
        ...payload,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const updateRoleSlice = createSlice({
  name: 'updateRole',
  initialState: {
    data: null,
    isLoading: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(updateRole.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const updateRoleActions = (state) => state.updateRole.data;
export default updateRoleSlice.reducer;