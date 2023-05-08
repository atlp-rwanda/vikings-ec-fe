import React from 'react';
import SaleRow from './SaleRow';

const salesList = ({ data }) => {
  const sales = data?.sellerSales;
  return (
    <div className="overflow-x-auto xs:w-screen md:px-24 xs:px-4 sm:px-4 mb-5">
      <table className="w-full text-sm text-left text-black-500">
        <caption className="px-6 py-3 text-left text-green-600 font-bold text-[17px]">
          All Sales
        </caption>
        <thead className="text-xs text-white">
          <tr className="border-b">
            <th scope="col" className="px-2 py-3" />
            <th scope="col" className="px-6 py-3 text-green-600">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 text-green-600">
              Unit Price / RWF
            </th>
            <th scope="col" className="px-6 py-3 text-green-600">
              Quantity Sold
            </th>
            <th scope="col" className="px-6 py-3 text-green-600">
              Status
            </th>
            <th scope="col" className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          { sales
            && sales.map((sale) => (
              <SaleRow key={sale.id} sale={sale} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default salesList;
