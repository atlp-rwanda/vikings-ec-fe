import React from 'react';
import { Outlet } from 'react-router-dom';

function ProfileLayout() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
