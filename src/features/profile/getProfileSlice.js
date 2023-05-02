import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const getProfile = createAsyncThunk(
  'profile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(endpoints.profile);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const getProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const getProfileActions = getProfileSlice.actions;
export default getProfileSlice.reducer;
