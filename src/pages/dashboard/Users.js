import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/auth/userSlice';
import UsersTable from '../../components/users/UsersTable';
import Loader from '../../components/Loader';

const Users = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (data !== null && data !== undefined) {
    const users = data.data.items;
  }
  return (
    <div>
      {isLoading || !data ? <Loader /> : <UsersTable data={data} />}
    </div>

  );
};

export default Users;
