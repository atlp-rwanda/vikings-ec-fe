import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import welcomeReducer from './features/auth/welcomeSlice';
import loginReducer from './features/auth/loginSlice';
import googleAuthReducer from './features/auth/googleAuthSlice';
import signupReducer from './features/auth/signupSlice';
import twoFactorAuthReducer from './features/auth/twoFactorAuth';
import forgotPasswordReducer from './features/auth/forgotPasswordSlice';
import resetPasswordReducer from './features/auth/resetPasswordSlice';
import profile from './features/profile/getProfileSlice';
import updateProfile from './features/profile/updateProfileSlice';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedLogin = persistReducer(persistConfig, loginReducer);
const persistedTwoFactor = persistReducer(persistConfig, twoFactorAuthReducer);
const store = configureStore({
  reducer: {
    message: welcomeReducer,
    login: persistedLogin,
    googleAuth: googleAuthReducer,
    signup: signupReducer,
    twoFactorAuth: persistedTwoFactor,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    profile,
    updateProfile,
  },
  middleware: [...middlewares, thunk],
});

export const persistor = persistStore(store);
export default store;
