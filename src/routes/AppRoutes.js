import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/HomePage';
import StorybookRedirect from '../pages/redirect/StorybookRedirect'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/redirect" element={<StorybookRedirect />} /> 
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
