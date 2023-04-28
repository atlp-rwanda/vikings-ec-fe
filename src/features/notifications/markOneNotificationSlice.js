import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../../utils/endpoints';
import axios from '../api/customAxios';

export const markOneNotification = createAsyncThunk(
  'markOneNotification',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${Endpoints.notifications}/${id}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const markOneNotificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [markOneNotification.pending]: (state) => {
      state.isLoading = true;
      state.data = {};
      state.error = null;
    },
    [markOneNotification.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [markOneNotification.rejected]: (state, action) => {
      state.data = {};
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default markOneNotificationSlice.reducer;
