import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers} from '../../features/auth/userSlice';
import Users from '../../components/users/UsersTable';
import Loader from '../../components/Loader';

function Dashboard() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (data !== null && data !== undefined) {
    const users = data.data.items;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading || !data ? <Loader/> : <Users data={data} />}
      <br/>
      <Link to="/">go to home page</Link>
    </div>

  );
}

export default Dashboard;
