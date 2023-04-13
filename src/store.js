import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import welcomeReducer from './features/auth/welcomeSlice';
import loginReducer from './features/auth/loginSlice';
import googleAuthReducer from './features/auth/googleAuthSlice';
import signupReducer from './features/auth/signupSlice';
import twoFactorAuthReducer from './features/auth/twoFactorAuth';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    message: welcomeReducer,
    login: loginReducer,
    googleAuth: googleAuthReducer,
    signup: signupReducer,
    twoFactorAuth: twoFactorAuthReducer,
  },
  middleware: [...middlewares, thunk],
});

export default store;
