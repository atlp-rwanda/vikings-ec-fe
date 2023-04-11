import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { getProfile } from '../../features/profile/getProfileSlice';
import Account from '../../components/profile/Account';
import Address from '../../components/profile/Address';
import loader from '../../../public/images/icons/loader.svg';
import accountEdit from '../../../public/images/icons/account_edit.svg';
import locationEdit from '../../../public/images/icons/location_edit.svg';
import passwordEdit from '../../../public/images/icons/passwordEdit.svg';
import UpdatePasswordPage from '../auth/UpdatePasswordPage';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { data: newData } = useSelector((state) => state.updateProfile);
  useEffect(() => {
    dispatch(getProfile());
  }, [newData]);
  const { data } = useSelector((state) => state.profile);
  return (

    <Tabs className="flex mx-auto w-9/12 mt-16 justify-between" focusTabOnClick={false} data-testid="tabs">
      <TabList className="mr-32 xs:mr-4">
        <Tab>
          <img className="hidden xs:block" src={accountEdit} alt="Account Icon" width={32} height={32} />
          <span className="xs:hidden">Account</span>
        </Tab>
        <Tab>
          <img className="hidden xs:block mt-3" src={locationEdit} alt="Location Icon" width={32} height={32} />
          <span className="xs:hidden">Address</span>
        </Tab>
        <Tab>
          <img className="hidden xs:block mt-3" src={passwordEdit} alt="Security Icon" width={32} height={32} />
          <span className="xs:hidden">Security</span>
        </Tab>
      </TabList>
      <TabPanel>
        <div className="border border-grey-400 p-12 flex-grow xs:p-0 xs:border-none">
          {data ? (
            <Account data={data} />
          ) : (<img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />)}
        </div>
      </TabPanel>
      <TabPanel>
        <div className="border border-grey-400 p-12 flex-grow xs:p-0 xs:border-none">
          {data ? (
            <Address data={data} />
          ) : (
            <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
          )}
        </div>
      </TabPanel>
      <TabPanel>
        <div className="border border-grey-400 p-12 flex-grow xs:p-0 xs:border-none">
          {data ? (
            <UpdatePasswordPage data={data} />
          ) : (
            <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
          )}
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default EditProfile;
