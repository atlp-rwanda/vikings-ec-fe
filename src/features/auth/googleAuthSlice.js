import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Endpoints from '../../utils/endpoints';
import axios from '../api/customAxios';

export const googleRedirect = createAsyncThunk(
  'googleAuth/google_redirect',
  async (search, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.googleRedirect}${search}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  message: '',
  data: null,
  error: null,
  isLoading: false,
};

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState,
  extraReducers: {
    [googleRedirect.pending]: (state) => {
      state.isLoading = true;
    },
    [googleRedirect.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', payload.token);
      state.error = null;
    },
    [googleRedirect.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const getAllShows = (state) => state.googleAuth.message;
export default googleAuthSlice.reducer;
