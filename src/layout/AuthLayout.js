import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div>
      <h1>Navbar</h1>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
