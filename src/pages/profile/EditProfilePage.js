import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../features/actions/profileAction';
import ProfileSidebar from '../../components/profile/Sidebar';
import Account from '../../components/profile/Account';

export function ViewProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const { data } = useSelector((state) => state.profile);
  return (
    <>
      <ProfileSidebar />
      <div className="w-9/12 mx-auto">
        {data && (
        <>
          <Account data={data} />
          <Link to="/">Back to home page</Link>
        </>
        )}
      </div>
    </>
  );
}

export default ViewProfile;
