import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import TopMenu from '../components/TopMenu';
import SubMenu from '../components/SubMenu';
import Footer from '../components/Footer';
import { showErrorMessage } from '../utils/toast';

const ProfileLayout = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated) === true ? useSelector((state) => state.login.isAuthenticated) : useSelector((state) => state.twoFactorAuth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      showErrorMessage('You are not logged in');
      return navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-col w-full px-10 md:px-24 xl:px-60 xs:px-2">
        <TopMenu />
      </div>
      <div className="flex flex-col w-full">
        <SubMenu />
      </div>
      <Outlet />
      <div className="flex flex-col w-full mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ProfileLayout;
