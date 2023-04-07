import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/HomePage';
import GoogleRedirect from '../pages/auth/GoogleRedirect';

export const getRoutes = () => [
  <Route key="key__" path="/" element={<HomePage />} />,
  <Route key="key__auth" path="/auth" element={<AuthLayout />}>
    <Route path="signin" index element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>,
  <Route key="key__redirect-google" path="/redirect-google" element={<GoogleRedirect />} />,
  <Route key="key_general_path" path="*" element={<h2>Page Not Found</h2>} />,
];
const AppRoutes = () => (
  <BrowserRouter>
    <ToastContainer />
    <Routes>{getRoutes()}</Routes>
  </BrowserRouter>
);

export default AppRoutes;
