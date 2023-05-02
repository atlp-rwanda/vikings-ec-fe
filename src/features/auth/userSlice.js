import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../api/customAxios';

export const getUsers = createAsyncThunk(
  'user/fetchUsers',
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.get('/users');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeField(state, { payload }) {
      if(state.data?.data?.items){
        state.data.data.items = state.data.data.items.map(each => {
          if(payload.userId !== each.id)
          {
            return each;
          }
          return {...each, [payload.field]:payload.value}
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
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});
export const getUserActions = userSlice.actions;
export default userSlice.reducer;
