import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import UserInfo from './UserInfo';
import UserAddress from './UserAddress';

const ProfileSummary = ({ data }) => (
  <div className="border border-grey-400 p-12 poppins" data-testid="profile_summary">
    <div className="flex flex-row items-center gap-5 mb-6">
      <Avatar {...data} />
      <UserInfo {...data} />
    </div>
    <UserAddress {...data} />
    <div className="flex justify-end">
      <Link
        to="/profile/update"
        className="text-white bg-green-500 hover:bg-green-600 text-sm px-5 py-2.5 mt-4 ml-auto font-bold w-full md:w-auto text-center"
      >
        Edit Profile
      </Link>
    </div>
  </div>
);

export default ProfileSummary;
