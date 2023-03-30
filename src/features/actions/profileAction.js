import { createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const getProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.get('/users/profile');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.put('/users/profile', profileData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
