import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ticked from '../../assets/images/tick-1.png';
import Order from '../../components/orders/BuyerOrders';
import { getOrderDetails } from '../../features/order/orderSlice';
import Loader from '../../components/Loader';

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.order);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch]);
  let orderedProduct = null;
  let total = null;
  if (data) {
    orderedProduct = data.map((orderProduct) => {
      total = orderProduct.totalPrice;
      return (
        <Order
          key={orderProduct.product.id}
          productName={orderProduct.product.name}
          price={orderProduct.product.price}
          quantity={orderProduct.order.quantity}
          image={orderProduct.product.images[0]}
        />
      );
    });
  }
  return (
    <div className="flex flex-col gap-3 mt-20 pb-10 xs:px-2  sm:px-24 " data-testid="success-payment">
      {isLoading ? <Loader />
        : (
          <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-2">
              {orderedProduct}
            </div>
            <div className="flex gap-1 mt-3">
              <img src={ticked} alt="tick-1" className="w-14 h-14 -mt-4 -pl-3" />
              <p className="font-semibold">Total amount: </p>
              <span className="text-[#64B937] text-[18px] font-bold">
                {total}
                RWF
              </span>
            </div>
            <p className="text-lg mb-1">Congratulations! Your payment has been received and your order is being processed.</p>
            <p className="text-md font-medium text-[#64B937] text-[20px] -mt-4">Thank you for shopping with us!</p>

          </>
        )}
    </div>
  );
};
export default PaymentSuccessPage;
