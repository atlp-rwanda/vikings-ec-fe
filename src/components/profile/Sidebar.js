import React from 'react';
import { Link } from 'react-router-dom';

function ProfileSidebar() {
  return (
    <>
      <Link to="/profile/update/account">Account</Link>
      <Link to="/profile/update/security">Security</Link>
      <Link to="/profile/update/address">Address</Link>
    </>
  );
}

export default ProfileSidebar;
