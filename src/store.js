import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import welcomeSlice from './features/auth/welcomeSlice';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const store = configureStore({
  reducer: {
    message: welcomeSlice,
  },
  middleware: [...middlewares, thunk],
});
export default store;
