import React from 'react';
import loader from '../../public/images/icons/loader.svg';

const Loader = () => (
  <div className="flex justify-center mt-24 py-16">
    <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" data-testid="spinner" />
  </div>
);

export default Loader;
