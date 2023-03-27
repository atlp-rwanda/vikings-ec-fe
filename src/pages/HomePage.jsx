import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getMessage from '../features/actions/welcomeAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(getMessage());
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <h2 className="underline">{data.message}</h2>
      <Link to="/auth">Login</Link>
      <br />
      <Link to="https://www.chromatic.com/builds?appId=64218d727e570b64b94415f8">
        Go to storybook
      </Link>
    </div>
  );
};

export default HomePage;
