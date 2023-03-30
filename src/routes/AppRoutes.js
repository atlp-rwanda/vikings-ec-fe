import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/HomePage';
import GoogleRedirect from '../pages/auth/GoogleRedirect';
import TwoFactorAuthPage from '../pages/auth/twoFactorAuthPage';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import ProfileLayout from '../layout/ProfileLayout';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import HomeLayout from '../layout/HomeLayout';

export const getRoutes = () => [
  <Route key="key__" path="/" element={<HomeLayout />}>
    <Route index element={<HomePage />} />
  </Route>,
  <Route key="key__auth" path="/auth" element={<AuthLayout />}>
    <Route path="signin" index element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
    <Route key="key__verify__auth" path="verify/:id" element={<TwoFactorAuthPage />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
  </Route>,
  <Route key="key__redirect-google" path="/redirect-google" element={<GoogleRedirect />} />,
  <Route key="key__profile" path="/profile" element={<ProfileLayout />}>
    <Route index element={<ProfilePage />} />
    <Route path="update" element={<EditProfilePage />} />
  </Route>,
  <Route key="key_general_path" path="*" element={<h2>Page Not Found</h2>} />,
];
const AppRoutes = () => (
  <BrowserRouter>
    <ToastContainer />
    <Routes>{getRoutes()}</Routes>
  </BrowserRouter>
);

export default AppRoutes;
