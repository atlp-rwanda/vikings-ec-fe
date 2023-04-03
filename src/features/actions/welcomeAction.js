import { createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

const getMessage = createAsyncThunk(
  'message/fetchMessage',
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.get('/');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export default getMessage;
