import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutDiv = () => {
  const { data: cart } = useSelector((state) => state.cart);

  return (
    <div className="flex bg-white md:flex-col gap-3 max-w-xs w-full ">
      <div className="flex w-full md:w-auto gap-2 justify-evenly items-center md:border-2 border-[#D9D9D9] px-2 py-4">
        <h6 className="">Total </h6>
        <p className="text-[#7AC751] font-bold">
          RWF &nbsp;
          {cart?.total || 0}
        </p>
      </div>
      <button type="button" className="bg-[#7AC751] w-full md:w-auto text-white py-2 rounded-lg"> Checkout</button>
    </div>
  );
};

export default CheckoutDiv;
