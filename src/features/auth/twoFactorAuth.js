import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const verifyAuth = createAsyncThunk(
  'user/verifyAuth',
  async ({ authCode, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/login/verify/${id}`, {
        authCode,
      });
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const twoFactorAuthSlice = createSlice({
  name: 'verifyAuth',
  initialState: {
    data: null,
    isLoading: false,
    isAuthenticated: false,
  },
  extraReducers: (builer) => {
    builer
      .addCase(verifyAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default twoFactorAuthSlice.reducer;
