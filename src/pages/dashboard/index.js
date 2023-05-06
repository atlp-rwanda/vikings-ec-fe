import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../features/stastics/stats';
import ExpiredProducts from '../../components/products/ExpiredProducts';
import WishedProducts from '../../components/products/WishedProducts';
import CategorySales from '../../components/products/CategorySales';
import Button from '../../components/forms/Button';
import InputField from '../../components/forms/InputField';
import { formatDate } from '../../utils/formatDate';
import ProductSales from '../../components/products/ProductSales';
import Loader from '../../components/Loader';

const Stats = () => {
  const dispatch = useDispatch();
  const { data,isLoading } = useSelector((state) => state.stastics);
  let currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);
  const formattedDate = formatDate(lastMonthDate);
  currentDate.setDate(currentDate.getDate()+ 1)
  currentDate = formatDate(currentDate);
  const today=formatDate(new Date())
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(currentDate);
  useEffect(() => {
    dispatch(getStats({ start: startDate, end: endDate }));
  }, [startDate, endDate]);
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDate = (event) => {
    let date=new Date(event.target.value);
    date.setDate(date.getDate()+ 1)
    setEndDate(formatDate(date));
  };
  {
     return (
      <div className="-mt-8 overflow-scroll pb-16">
        <div className="flex justify-around items-center mx-20 xs:w-screen xs:flex-col py-6 xs:mx-0 font-poppins font-bold md:gap-2">
          <h1 className="">Filter By Date</h1>
          <div className="flex items-center justify-between md:p-2 md:w-full">
            <p>From</p>
            <InputField
              type="date"
              className="bg-white p-2 mt-5"
              defaultValue={formattedDate}
              onChange={handleStartDate}
              max={endDate}
            />
          </div>
          <div className="flex items-center justify-between md:p-2 md:w-full">
            <p>To</p>
            <InputField
              type="date"
              className="bg-white p-2 mt-5"
              defaultValue={endDate}
              onChange={handleEndDate}
              min={startDate}
              max={today}
            />
          </div>
        </div>
        <div className="flex md:px-20 justify-around xs:grid grid-cols-1 xs:w-full gap-8 font-poppins font-bold xs:text-sm xs:px-4 text-xl text-white">
          <div className="bg-gradient-to-r w-1/4 xs:w-full from-[#54dce6] to-[#92d96c] p-2 ">
            <p>Created Products</p>
            <span className="flex justify-end">{data?.productCreated}</span>
          </div>
          <div className="bg-gradient-to-r w-1/4 xs:w-full from-[#67abd2] to-[#92d96c] p-2">
            <p>New Sales</p>
            <span className="flex justify-end">
              {data?.sales.productStatistics.length}
            </span>
          </div>
          <div className="bg-gradient-to-r w-1/4 xs:w-full from-[#d36b80] to-[#92d96c] p-2">
            <p>Expired Products</p>
            <span className="flex justify-end">
              {data?.expired.details.length}
            </span>
          </div>
          <div className="bg-gradient-to-r w-1/4 xs:w-full from-[#ae57c1] to-[#92d96c] p-2">
            <p>Wished Products</p>
            <span className="flex justify-end">{data?.wishes.length}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-1 gap-8 max-w-[100%] md:mx-20 mt-10 px-6">
          <ExpiredProducts data={data?.expired?.details} date={{startDate,endDate}} />
          <WishedProducts data={data?.wishes} date={{startDate,endDate}} />
          <CategorySales data={data?.sales?.categorySales} date={{startDate,endDate}} />
          <ProductSales data={data?.sales?.productStatistics} date={{startDate,endDate}} />
        </div>
      </div>
    )
  }
};

export default Stats;
