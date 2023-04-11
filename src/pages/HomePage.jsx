import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getMessage from '../features/actions/welcomeAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.message);
  const { data: userData } = useSelector((state) => state.googleAuth);
  useEffect(() => {
    dispatch(getMessage());
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <h2 className="underline">{data.message}</h2>
      <Link to="/auth/signin">Login</Link>
      <br />
      <Link to="/auth/signup">Signup</Link>
      <br />
      <Link to="https://www.chromatic.com/builds?appId=64218d727e570b64b94415f8">
        Go to storybook
      </Link>
      <h1>{JSON.stringify(userData !== null ? userData.user : 'no user found')}</h1>
    </div>
  );
};

export default HomePage;
