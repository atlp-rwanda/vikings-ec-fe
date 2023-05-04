import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentsSession } from '../../features/payments/PaymentsSlice';
import loader from '../../../public/images/icons/loader.svg';

const CheckoutDiv = () => {
  const dispatch = useDispatch();
  const { data: cart } = useSelector((state) => state.cart);
  const {data, isLoading} = useSelector((state) => state.payment);
  const createCheckoutSession = () => {
    dispatch(createPaymentsSession());
  }
  if(data) window.location.href = data.url;

  return (
    <div className="flex bg-white md:flex-col gap-3 max-w-xs w-full ">
      <div className="flex w-full md:w-auto gap-2 justify-evenly items-center md:border-2 border-[#D9D9D9] px-2 py-4">
        <h6 className="">Total </h6>
        <p className="text-[#7AC751] font-bold">
          RWF &nbsp;
          {cart?.total || 0}
        </p>
      </div>
      <button type="button" disabled={isLoading} className="bg-[#7AC751] w-full md:w-auto text-white py-2 rounded-lg"
      onClick={createCheckoutSession}>
      {isLoading ? <div className="flex justify-center mt-0 py-0">
        <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[20px] text-center" data-testid="spinner" />
      </div> : 'Checkout'}
      </button>
    </div>
  );
};

export default CheckoutDiv;
