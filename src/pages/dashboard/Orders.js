import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import BuyerOrders from '../../components/orders/BuyerOrders';
import { getBuyerOrders } from '../../features/order/getBuyerOrderslice';

function OrderDashboard() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.fetchOrders);
  const data = useSelector((state) => state.fetchOrders);
  useEffect(() => {
    dispatch(getBuyerOrders({ page: 1 }));
  }, []);

  return (
    <div>
       {isLoading ? <Loader/> : <BuyerOrders data={data} />}
    </div>

  );
}

export default OrderDashboard;
