import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../public/images/logo.svg';
import account from '../../public/images/icons/account.svg';
import shop from '../../public/images/icons/shop.svg';
import bell from '../../public/images/icons/bell.svg';
import Search from './products/Search';

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
      <div className="flex flex-row align-middle gap-6 mt-1">
        <a href="/profile" className="flex flex-col align-middle h-fit">
          <img src={shop} alt="Shop Icon" />
        </a>
        <a href="/profile" className="flex flex-col align-middle h-fit">
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
