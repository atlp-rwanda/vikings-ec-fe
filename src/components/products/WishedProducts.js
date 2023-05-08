import React from 'react';
import calendar from '../../../public/images/calendar.svg';
import { formatToenUs } from '../../utils/formatDate';
import Image from '../images';

const WishedProducts = ({ data,date }) => (
  <div className="font-poppins">
    <table className="w-full bg-white h-[50%] overflow-scroll">
      <caption className="w-full table-caption border-b py-2 px-2">
        <p className="inline-block float-left font-bold">Wished Products</p>
        <div className="float-right flex">
            <img src={calendar} className="cursor-pointer" />
            <span className='ml-3 text-sm'>{formatToenUs(date.startDate)} - {formatToenUs(date.endDate)}</span>
        </div>
      </caption>
      <thead>
        <tr className="border-b text-left">
        <th></th>
          <th className="py-2 px-4 font-normal">Name</th>
          <th className="py-2 font-normal">Wishes</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id} className="border-b">
            <td>
              <Image src={item.image} className='rounded-full w-10 h-10'/>
            </td>
            <td className="py-2 px-4">{item?.name}</td>
            <td className="py-2">{item?.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default WishedProducts;
