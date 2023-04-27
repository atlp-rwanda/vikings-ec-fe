import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './api/customAxios';

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async (categoryData, { rejectWithValue }) => {
    try {
      const {
        data: { categories },
      } = await axios.get('/categories/');
      return categories;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message;
      });
  },
});

export const fetchCategoriesActions = (state) => state.fetchCategories.data;

export default categorySlice.reducer;
