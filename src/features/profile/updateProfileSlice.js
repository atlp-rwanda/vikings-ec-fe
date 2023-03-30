import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/customAxios';
import endpoints from '../../utils/endpoints';

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(endpoints.profile, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

const initialData = {
  firstname: '',
  lastname: '',
  birthdate: '',
  email: '',
  gender: '',
  phone: '',
  billingAddress: {
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  },
};
export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    data: initialData,
    ui: {
      avatar: null,
    },
    error: null,
    isLoading: false,
  },
  reducers: {
    changeAvatar(state, { payload }) {
      state.ui.avatar = payload.avatar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const getAllShows = (state) => state.data.updateProfile;
export const updateProfileActions = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
