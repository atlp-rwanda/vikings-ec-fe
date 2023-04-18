import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import Endpoints from '../../utils/endpoints';

export const getMessages = createAsyncThunk('getMessages', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(Endpoints.chats);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getMessagesSlice = createSlice({
  name: 'getMessages',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessage(state, { payload }) {
      state.messages = [payload, ...state.messages];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages.rows;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const getAllShows = (state) => state.data.getMessages;
export const { addMessage } = getMessagesSlice.actions;

export default getMessagesSlice.reducer;
