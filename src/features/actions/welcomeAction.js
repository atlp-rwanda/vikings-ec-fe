import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../api/customAxios';

export const getMessage = createAsyncThunk(
  'message/fetchMessage',
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.get('/',
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export default getMessage;
