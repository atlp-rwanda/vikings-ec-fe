import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../public/images/logo.svg';
import account from '../../public/images/icons/account.svg';
import bell from '../../public/images/icons/bell.svg';
import dashboardIcon from '../../public/images/icons/dashboard_icon.svg';
import Search from './products/Search';
import ShoppingCart from './cart/ShoppingCart';

const TopMenu = () => {
  const { pathname } = useLocation();
  const isRootUrl = pathname === '/';

  return (
    <div className="flex flex-row justify-between my-4">
      <a href="/" className="flex items-center">
        <img src={Logo} className="h-6 sm:h-9" alt="Vikings Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          Vikings
        </span>
      </a>
      {isRootUrl && (
        <div>
          <Search />
        </div>
      )}
      <div className="flex flex-row items-center gap-6 mt-1">
        <a href="/dashboard" className="h-fit">
          <img src={dashboardIcon} alt="Dashboard Icon" />
        </a>
        <a href="/cart" className="flex flex-col align-middle h-fit">
          <ShoppingCart />
        </a>
        <a href="/notification" className="flex flex-col align-middle h-fit">
          <img src={bell} alt="Bell Icon" />
        </a>
        <a href="/profile" className="flex flex-col align-middle h-fit">
          <img src={account} alt="Account Icon" />
        </a>
      </div>
    </div>
  );
};

export default TopMenu;
