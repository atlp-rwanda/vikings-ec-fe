import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuyerOrders } from "../../features/order/getBuyerOrderslice";
import Pagination from "../Pagination";
import  OrderRow from "./OrderRow"

function OrdersTable({ data }) {

   const dispatch = useDispatch();
   const orders = data?.data?.data?.orders.items;
   const { pagination } = useSelector((state) => state.fetchOrders);
  return (
    <div className="overflow-x-auto xs:w-screen md:px-24 xs:px-4 sm:px-4 mb-5">
      <table className="w-full text-sm text-left text-black-500">
        <caption className="px-6 py-3 text-left text-green-600 font-bold text-[17px]">
          Orders
        </caption>
        <thead className="text-xs text-white">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              order id
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              full price
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              quantity
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              status
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              date added
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              action
            </th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
        </tbody>
      </table>
      <div className="flex justify-center"> 
        <Pagination
          currentPage={parseInt(pagination.currentPage, 10)}
          pageCount={pagination.totalPages}
          setPageNumber={(page) => { dispatch(getBuyerOrders({ page })); }}
        />
      </div>
    </div>
  );
}

export default OrdersTable;
