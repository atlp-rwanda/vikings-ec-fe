import React from 'react';
import Logo from '../../public/images/logo.svg';
import account from '../../public/images/icons/account.svg';
import dashboardIcon from '../../public/images/icons/dashboard_icon.svg';
import Search from './products/Search';
import ShoppingCart from './cart/ShoppingCart';
import Notifications from './Notification';
import wish from '../../public/images/wish.svg';

const TopMenu = () => (
  <div className="flex flex-row justify-between my-4 gap-2">
    <a href="/" className="flex items-center w-full">
      <img src={Logo} className="h-6 sm:h-9" alt="Vikings Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap">
        Vikings
      </span>
    </a>
    <div className="hidden md:block w-full">
      <Search />
    </div>
    <div className="flex flex-row items-center justify-end gap-6 mt-1 w-full ">
      <a href="/dashboard" className="h-fit">
        <img src={dashboardIcon} alt="Dashboard Icon" />
      </a>
      <a href="/cart" className="flex flex-col align-middle h-fit">
        <ShoppingCart />
      </a>
      <a className="flex flex-col align-middle h-fit">
        <Notifications />
      </a>
      <a href="/profile" className="flex flex-col align-middle h-fit">
        <img src={account} alt="Account Icon" />
      </a>
      <a href="/wishlist" className="flex flex-col align-middle h-fit">
        <img src={wish} alt="wish Icon" />
      </a>
    </div>
  </div>
);
export default TopMenu;
