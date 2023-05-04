import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSales } from '../../features/sales/getSalesSlice';
import Loader from '../../components/Loader';
import SalesList from '../../components/sales/SalesList';

const Sales = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.sales);
  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);
  return (
    <div>
      {isLoading || !data ? <Loader /> : <SalesList data={data} />}
    </div>
  );
};

export default Sales;
