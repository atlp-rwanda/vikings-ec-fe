import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Endpoints from '../../utils/endpoints';
import axios from '../api/customAxios';

export const verifyEmail = createAsyncThunk(
  'verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.verifyEmail}/${token}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const initialState = {
  message: '',
  data: null,
  error: null,
  isLoading: false,
};

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  extraReducers: {
    [verifyEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyEmail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.error = null;
    },
    [verifyEmail.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const getAllShows = (state) => state.verifyEmail.message;
export default verifyEmailSlice.reducer;
