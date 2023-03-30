import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSummary from '../../components/profile/ProfileSummary';
import { getProfile } from '../../features/profile/getProfileSlice';
import loader from '../../../public/images/icons/loader.svg';

export const ViewProfile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <div className="xs:w-11/12 sm:w-10/12 md:w-9/12 mx-auto mt-16 profile">
      {data ? <ProfileSummary data={data} /> : (
        <div className="flex justify-center">
          <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" data-testid="spinner"/>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
