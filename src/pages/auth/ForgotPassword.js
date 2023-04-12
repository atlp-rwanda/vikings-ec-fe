import React from 'react';
import middleImage from '../../../public/images/middleImage.svg';
import bgImage from '../../../public/images/bgsvg.svg';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

const ForgotPassword = () => (
  <div className="flex flex-col md:flex-row md:h-full lg:justify-between justify-center items-center xs:flex-grow bg-login">
    <img src={bgImage} alt="" className="absolute inset-x-0 bottom-0 pointer-events-none" />
    <div className="flex flex-col xs:items-center xs:w-full xs:px-6 ">
      <h1 className="text-3xl lg:text-[50px] mb-[3rem] ">Forgot your password.</h1>
      <p className="text-xl  xs:w-full max-w-md">
        No need to worry, fill out your email address and
        we’ll send you the password-reset instructions.
      </p>
    </div>

    <div className="hidden sm:flex ">
      <img src={middleImage} alt="" />
    </div>

    <div className="flex flex-col max-w-sm w-full ">
      <ForgotPasswordForm />
    </div>
  </div>
);
export default ForgotPassword;
