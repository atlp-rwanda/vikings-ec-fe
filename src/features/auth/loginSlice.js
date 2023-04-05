/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const login = createAsyncThunk(
  'login',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', loginData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    [login.fulfilled]: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const loginActions = (state) => state.login.data;

export default loginSlice.reducer;
