import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { showErrorMessage } from '../utils/toast';

const DashboardLayout = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated) || useSelector((state) => state.twoFactorAuth.isAuthenticated) || useSelector((state) => state.googleAuth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      showErrorMessage('You are not logged in');
      return navigate('/');
    }
  }, [isAuthenticated]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col bg-[#F8F7FC] flex-grow mb-8">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
