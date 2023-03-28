import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getMessage from '../features/actions/welcomeAction';

function HomePage() {
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
    </div>
  );
}

export default HomePage;
