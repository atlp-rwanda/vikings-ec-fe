import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import welcomeSlice from './features/auth/welcomeSlice';
import profile from './features/slices/profileSlice';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const store = configureStore({
  reducer: {
    message: welcomeSlice,
    profile,
  },
  middleware: [...middlewares, thunk],
});
export default store;
