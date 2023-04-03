import React from 'react';
import middleImage from '../../../public/images/middleImage.jpg';
import TwoFactorAuthForm from '../../components/forms/twoFactorAuthForm';
import bgImage from '../../../public/images/bgsvg.svg';

const TwoFactorAuthPage = () => (
  <div className="flex flex-col lg:flex-row lg:h-full lg:justify-between justify-center items-center xs:flex-grow bg-login">
    <img
      src={bgImage}
      alt=""
      className="absolute inset-x-0 pointer-events-none"
    />
    <div className="flex flex-col xs:items-center xs:w-full xs:px-6 ">
      <h1 className="text-3xl md:text-[40px] xs:text-[23px] mb-[3rem] ">
        Two Factor Authentication
      </h1>
      <p className="text-xl  xs:w-full">
        Enter Auth Code We have sent
        <br />
        you on your email
      </p>
    </div>

    <div className="hidden sm:flex ">
      <img src={middleImage} alt="" />
    </div>

    <div className="flex flex-col max-w-sm w-full ">
      <TwoFactorAuthForm />
    </div>
  </div>
);

export default TwoFactorAuthPage;
