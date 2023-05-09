import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../public/images/logo.svg';
import Avatar from './profile/Avatar';
import Notifications from './Notification';
import { getProfile } from '../features/profile/getProfileSlice';
import Prof from '../../public/images/icons/prof.png';
import { NavLink } from 'react-router-dom';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <div className="flex gap-2 p-4 md:px-24 xs:px-4 sm:px-4 items-center justify-between mb-8">
      <div className="hidden xs:block">
        <a href="/" className="flex items-center gap-2">
          <img src={Logo} className="h-6 sm:h-9" alt="Vikings Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-[#555555]">
            Vikings
          </span>
        </a>
      </div>
      <NavLink to="/dashboard" className="text-green-400 xs:hidden font-bold">Dashboard</NavLink>
      <div className="flex gap-4">
        <a className="flex flex-col align-middle h-fit">
          <Notifications />
        </a>
        <a href="/profile">
          {data?.avatar
            ? (<Avatar avatar={data?.avatar} className="w-8 h-8 rounded-full object-cover" />)
            : (<img src={Prof} className="w-8 h-8" alt="Profile Icon" />)}
        </a>

      </div>
    </div>
  );
};

export default DashboardHeader;
