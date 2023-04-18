import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import TopMenu from '../components/TopMenu';
import SubMenu from '../components/SubMenu';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated) === true ? useSelector((state) => state.login.isAuthenticated) : useSelector((state) => state.twoFactorAuth.isAuthenticated);
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      { isAuthenticated
        ? (
          <>
            <div className="flex flex-col w-full px-10 md:px-24 xl:px-60 xs:px-2">
              <TopMenu />
            </div>
            <div className="flex flex-col w-full">
              <SubMenu />
            </div>
          </>
        ) : (
          <div className="px-24">
            <Navbar />
          </div>
        )}
      <Outlet />
      <div className="flex flex-col w-full mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;