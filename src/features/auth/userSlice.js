import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const getUsers = createAsyncThunk(
  'user/fetchUsers',
  async ({ page }, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.get(`/users?limit=${10}&page=${page}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: null,
  pagination: {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: '10',
    totalPages: 1,
    currentPage: '1',

  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeField(state, { payload }) {
      if (state.data?.data?.items) {
        state.data.data.items = state.data.data.items.map((each) => {
          if (payload.userId !== each.id) {
            return each;
          }
          return { ...each, [payload.field]: payload.value };
        });
      }
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.pagination = payload.data?.meta;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
export const getUserActions = userSlice.actions;
export default userSlice.reducer;
