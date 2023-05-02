import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../../../public/images/empty_cart.svg';

const EmptyCart = () => {
  const { isLoading } = useSelector((state) => state.cart);
  return isLoading
    ? null
    : (
      <div className="mx-auto flex flex-col gap-2 items-center">
        <img src={emptyCart} alt="" />
        <h1 className="text-center text-2xl text-[#CCCCCC]">Your cart is empty</h1>
        <Link to="/" className="text-white text-lg bg-[#338E03] font-bold py-2 px-4 rounded-full  ">Continue Shopping</Link>
      </div>
    );
};
export default EmptyCart;
