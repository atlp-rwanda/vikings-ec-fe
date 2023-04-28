import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import expireReducer from 'redux-persist-expire';
import welcomeReducer from './features/auth/welcomeSlice';
import loginReducer from './features/auth/loginSlice';
import googleAuthReducer from './features/auth/googleAuthSlice';
import signupReducer from './features/auth/signupSlice';
import twoFactorAuthReducer from './features/auth/twoFactorAuth';
import forgotPasswordReducer from './features/auth/forgotPasswordSlice';
import resetPasswordReducer from './features/auth/resetPasswordSlice';
import profileReducer from './features/profile/getProfileSlice';
import updateProfileReducer from './features/profile/updateProfileSlice';
import verifyEmailReducer from './features/auth/VerifyEmailSlice';
import updatePasswordReducer from './features/auth/updatePasswordSlice';
import getProductsReducer from './features/product/getProductsSilice';
import singleProductReducer from './features/product/singleProductSlice';
import getRatingsReducer from './features/product/getRatingsSlice';
import createProductReducer from './features/createProductSlice';
import categoryReducer from './features/categorySlice';
import cartReducer from './features/cart/cartSlice';
import addToCartReducer from './features/cart/addToCartSlice';
import removeFromCartReducer from './features/cart/removeProductFromCartSlice';
import updateProductReducer from './features/product/updateProduct';
import deleteProductReducer from './features/product/deleteProduct';
import userReducer from './features/auth/userSlice';
import rolesReducer from './features/auth/rolesSlice';
import changeUserStatusReducer from './features/auth/changeUserStatusSlice';
import logoutReducer from './features/auth/logoutSlice';
import provideRatingsReducer from './features/ratings/ratingsSlice';
import recommendedProductsReducer from './features/product/recommededProducts';
import sendMessageReducer from './features/chat/sendMessage';
import getMessagesReducer from './features/chat/getMessages';
import PaymentCheckoutReducer from './features/payments/PaymentsSlice';
import getOrderDetailsReducer from './features/order/orderSlice';
import getSalesReducer from './features/sales/getSalesSlice';
import changeSalesStatusReducer from './features/sales/changeSalesStatusSlice';
import markProductReducer from './features/product/markProductSlice';
import notificationsReducer from './features/notifications/getNotificationSlice';
import markOneNotificationReducer from './features/notifications/markOneNotificationSlice';
import markAllNotificationsReducer from './features/notifications/markAllNotificationsSlice';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    expireReducer(loginReducer, {
      persistedAtKey: '__persisted_at',
      expireSeconds: 86400,
      expiredState: {
        data: null,
        isLoading: false,
        isAuthenticated: false,
      },
      autoExpire: false,
    }),
    expireReducer(twoFactorAuthReducer, {
      persistedAtKey: '__persisted_at',
      expireSeconds: 86400,
      expiredState: {
        data: null,
        isLoading: false,
        isAuthenticated: false,
      },
      autoExpire: false,
    }),
    expireReducer(googleAuthReducer, {
      persistedAtKey: '__persisted_at',
      expireSeconds: 86400,
      expiredState: {
        data: null,
        isLoading: false,
        isAuthenticated: false,
      },
      autoExpire: false,
    }),
  ],
};

const persistedLogin = persistReducer(persistConfig, loginReducer);
const persistedTwoFactor = persistReducer(persistConfig, twoFactorAuthReducer);
const persistedGoogleAuth = persistReducer(persistConfig, googleAuthReducer);

const store = configureStore({
  reducer: {
    message: welcomeReducer,
    login: persistedLogin,
    googleAuth: persistedGoogleAuth,
    signup: signupReducer,
    twoFactorAuth: persistedTwoFactor,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,
    updatePassword: updatePasswordReducer,
    createProduct: createProductReducer,
    product: getProductsReducer,
    singleProduct: singleProductReducer,
    getRatings: getRatingsReducer,
    updateProfile: updateProfileReducer,
    profile: profileReducer,
    category: categoryReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    cart: cartReducer,
    addToCart: addToCartReducer,
    removeFromCart: removeFromCartReducer,
    users: userReducer,
    roles: rolesReducer,
    changeStatus: changeUserStatusReducer,
    logout: logoutReducer,
    provideRatings: provideRatingsReducer,
    recommendedProducts: recommendedProductsReducer,
    sendMessage: sendMessageReducer,
    getMessages: getMessagesReducer,
    payment: PaymentCheckoutReducer,
    order: getOrderDetailsReducer,
    sales: getSalesReducer,
    changeSaleStatus: changeSalesStatusReducer,
    markProduct: markProductReducer,
    notifications: notificationsReducer,
    markOneNotification: markOneNotificationReducer,
    markAllNotifications: markAllNotificationsReducer,
  },
  middleware: [...middlewares, thunk],
});

export const persistor = persistStore(store);
export default store;
