import React from 'react';
import calendar from '../../../public/images/calendar.svg';
import { formatToenUs } from '../../utils/formatDate';

const CategorySales = ({ data, date }) => {
  return (
    <div className="font-poppins">
      <table className="w-full bg-white">
        <caption className="w-full table-caption border-b py-2 px-4">
          <p className="inline-block float-left font-bold">Category Sales</p>
          <div className="float-right flex">
            <img src={calendar} className="cursor-pointer" />
            <span className="ml-3 text-sm">
              {formatToenUs(date.startDate)} - {formatToenUs(date.endDate)}
            </span>
          </div>
        </caption>
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 px-4 font-normal">Category</th>
            <th className="py-2 font-normal">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.categoryId}>
              <td className="border-b py-2 px-4">{item?.category}</td>
              <td className="border-b py-2">{item?.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategorySales;
