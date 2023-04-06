import React from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../public/images/icons/google_icon.svg';

const GoogleAuthButton = () => (
  <Link to={`${process.env.REACT_APP_BASE_URL}/users/auth/google`} type="button" className=" bg-white p-2 shadow shadow-gray-400 rounded-full" onClick={() => {}}>
    <img alt="google" src={GoogleIcon} />
  </Link>
);

export default GoogleAuthButton;
