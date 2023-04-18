/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';

export const sendMessage = createAsyncThunk('sendMessage', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/chats', userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const sendMessageSlice = createSlice({
  name: 'sendMessage',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const sendMessageActions = (state) => state.sendMessage.data;

export default sendMessageSlice.reducer;
