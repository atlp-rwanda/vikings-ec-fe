import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import middleImage from '../../../public/images/middleImage.svg';
import bgImage from '../../../public/images/bgsvg.svg';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });

  return (
    <div className="flex flex-col md:flex-row md:h-full lg:justify-between justify-center items-center xs:flex-grow bg-login recursive">
      <img src={bgImage} alt="" className="absolute inset-x-0 bottom-0 pointer-events-none" />
      <div className="flex flex-col xs:items-center xs:w-full xs:px-6 ">
        <h1 className="text-3xl lg:text-[50px] mb-[3rem] ">Sign In</h1>
        <p className="text-xl  xs:w-full ">
          if you don’t have an account you can
          <br />
          <a href="/auth/signup" className="text-[#338E03] pt-2">
            Register here!
          </a>
        </p>
      </div>

      <div className="hidden sm:flex ">
        <img src={middleImage} alt="" />
      </div>

      <div className="flex flex-col max-w-sm w-full ">
        <LoginForm />
        <div className="flex items-center justify-center gap-2">
          <hr className="flex-grow border-gray-300 border-t " />
          <span className="px-4 text-[#ACADAC]">Or continue with</span>
          <hr className="flex-grow border-gray-300 border-t" />
        </div>
        <div className="flex items-center justify-center mt-4">
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
