import { createSlice } from '@reduxjs/toolkit';
import getMessage from '../actions/welcomeAction';

const initialState = {
  data: { message: 'welcome' },
  isLoading: false,
};

export const welcomeSlice = createSlice({
  name: 'message',
  initialState,
  extraReducers: {
    [getMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [getMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getMessage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const getAllShows = (state) => state.message.message;
export default welcomeSlice.reducer;
