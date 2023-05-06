import React from 'react';
import Image from '../../components/images';
import calendar from '../../../public/images/calendar.svg';
import { formatToenUs } from '../../utils/formatDate';

const ExpiredProducts = ({ data, date }) => {
  return (
    <div className=" font-poppins font-normal">
      <table className="w-full bg-white overflow-x-auto">
        <caption className="w-full table-caption border-b py-2 px-4">
          <p className="inline-block float-left font-bold">Expired Products</p>
          <div className="float-right flex">
            <img src={calendar} className="cursor-pointer" />
            <span className="ml-3 text-sm">
              {formatToenUs(date.startDate)} - {formatToenUs(date.endDate)}
            </span>
          </div>
        </caption>
        <thead>
          <tr className="border-b py-2 text-left">
          <th></th>
            <th className="py-2 px-4 font-normal">Name</th>
            <th className="font-normal">Unit Price</th>
            <th className="font-normal">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b py text-left">
              <td>
              <Image src={item.image} className="w-10 h-10 rounded-full" />
              </td>
              <td className="flex items-center py-2 px-4">
                {item?.name}
              </td>
              <td>{item?.price}</td>
              <td>{item?.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ExpiredProducts;
