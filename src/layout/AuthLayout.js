import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const AuthLayout = () => (
  <div className="flex flex-col h-screen bg-login bg-center">
    <Header />
    <div className="flex flex-col w-full h-full px-10 md:px-24 xl:px-60 xs:px-2">
      <Navbar />
      <Outlet />

    </div>

  </div>
);

export default AuthLayout;
