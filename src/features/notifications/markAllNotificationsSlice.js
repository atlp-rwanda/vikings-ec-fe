import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../../utils/endpoints';
import axios from '../api/customAxios';

export const markAllNotifications = createAsyncThunk(
  'markAllNotifications',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        Endpoints.notifications,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const markAllNotificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [markAllNotifications.pending]: (state) => {
      state.isLoading = true;
      state.data = {};
      state.error = null;
    },
    [markAllNotifications.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [markAllNotifications.rejected]: (state, action) => {
      state.data = {};
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default markAllNotificationsSlice.reducer;
