import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSummary from '../../components/profile/ProfileSummary';
import { getProfile } from '../../features/actions/profileAction';

export function ViewProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const { data } = useSelector((state) => state.profile);
  return (
    <div className="w-9/12 mx-auto">
      {data && (
      <ProfileSummary data={data} />
      )}
    </div>
  );
}

export default ViewProfile;
