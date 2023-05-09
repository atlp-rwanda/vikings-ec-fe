import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './features/api/customAxios';

export const createCategory = (createAsyncThunk(
  'createCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/categories', payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
));

export const createCategorySlice = createSlice({
  name: 'createCategory',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const createCategoryActions = createCategorySlice.actions;

export default createCategorySlice.reducer;
