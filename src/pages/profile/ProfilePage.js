import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSummary from '../../components/profile/ProfileSummary';
import { getProfile } from '../../features/actions/getProfileAction';

export const ViewProfile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div className="w-9/12 mx-auto">
      {data ? <ProfileSummary data={data} /> : <p>Loading profile...</p>}
    </div>
  );
};

export default ViewProfile;
