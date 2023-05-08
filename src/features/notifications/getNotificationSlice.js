import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../../utils/endpoints';
import axios from '../api/customAxios';

export const fetchNotifications = createAsyncThunk(
  'fetchNotifications',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${Endpoints.notifications}?limit=${arg?.limit || 10}&page=${arg?.page || 1}`,
      );
      return data.notifications;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    pagination: {
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    addNotifications: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    markOneAsRead: (state, { payload }) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === payload) {
          return { ...notification, isRead: true };
        }
        return notification;
      });
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => (
        { ...notification, isRead: true }));
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      const append = action?.meta?.arg?.append || false;
      state.notifications = append ? [...state.notifications, ...action.payload.rows]
        : action.payload.rows;
      state.pagination = {
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalItems: action.payload.totalItems,
      };
      state.isLoading = false;
      state.error = null;
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addNotifications, markOneAsRead, markAllAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
