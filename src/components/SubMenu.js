import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../public/images/icons/sidebar/logout.svg';
import Button from './forms/Button';
import { logout } from '../features/auth/logoutSlice';

const SubMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    { name: 'About', path: '/' },
    { name: 'Contact us', path: '/' },
  ];
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuItems = navItems.map((navItem) => (
    <li key={navItem.name}>
      <a
        href={navItem.path}
        className="py-2 text-gray-600 text-[14px] md:hover:text-[#338E03] uppercase"
      >
        {navItem.name}
      </a>
    </li>
  ));

  return (
    <div className="w-full flex xs:mt-2 flex-row bg-gray-100 py-4 px-10 md:px-24 xl:px-60 xs:px-2 xs:z-40 justify-between xs:flex-row-reverse">
      <ul className="hidden md:flex flex-row gap-4">
        {menuItems}
      </ul>
      <Button
        onClick={async () => {
          await dispatch(logout()).unwrap();
          navigate('/auth');
        }}
        className="!my-0 !p-0 h-full !bg-gray-100 hover:text-[#ecffe7]"
      >
        <div className="flex text-gray-600">
          <img src={LogoutIcon} alt="Logout Icon" className="w-[24px] h-[24px]" />
          <div className="ml-2 xs:hidden">Logout</div>

        </div>
      </Button>
      <div className="md:hidden flex items-center">
        {showMenu ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 cursor-pointer mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleMenu}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <ul className="fixed top-0 left-0 w-full h-full bg-gray-100 flex flex-col items-center justify-center">
              {menuItems}
              <button
                className="text-gray-600 mt-4 uppercase font-medium text-sm"
                onClick={toggleMenu}
              >
                Close
              </button>
            </ul>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
