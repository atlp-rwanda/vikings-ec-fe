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
import provideRatingsReducer from './features/ratings/ratingsSlice';
import recommendedProductsReducer from './features/product/recommededProducts';

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
    googleAuth: googleAuthReducer,
    users: userReducer,
    roles: rolesReducer,
    changeStatus: changeUserStatusReducer,
    provideRatings: provideRatingsReducer,
    recommendedProducts: recommendedProductsReducer,
  },
  middleware: [...middlewares, thunk],
});

export const persistor = persistStore(store);
export default store;
