import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/logout');
    localStorage.clear();
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    isAuthenticated: true,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.error = null;
    }).addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
    }).addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const logoutActions = (state) => state.logout.data;
export default logoutSlice.reducer;
