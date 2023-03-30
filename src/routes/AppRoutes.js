import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/HomePage';
import StorybookRedirect from '../pages/redirect/StorybookRedirect';
import ProfileLayout from '../layout/ProfileLayout';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import Account from '../components/profile/Account';
import Security from '../components/profile/Security';
import Address from '../components/profile/Address';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/redirect" element={<StorybookRedirect />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="update" element={<EditProfilePage />}>
            <Route index element={<Account />} />
            <Route path="security" element={<Security />} />
            <Route path="address" element={<Address />} />
          </Route>
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
