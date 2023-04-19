import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const updatePassword = createAsyncThunk(
  'updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/users/update-password', passwordData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  extraReducers: (builer) => {
    builer
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const updatePasswordActions = (state) => state.updatePassword.data;

export default updatePasswordSlice.reducer;
