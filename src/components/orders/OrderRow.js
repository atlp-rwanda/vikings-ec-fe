import React from "react";
import Modal from "../Modal";
import SingleOrderCard from "./SingleOrderCard";

export default function OrderRow({ order }) {

  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
        #{order?.id.slice(0, 8)}
      </td>
      <td className="px-6 py-4 text-center">{order?.fullPrice}</td>
      <td className="px-6 py-4 text-center">
        {order?.products.reduce((total, currentProduct) => {
          return total + currentProduct.quantity;
        }, 0)}
      </td>
      <td className="text-center">
        <button
          className={`px-3 py-1 text-center rounded-2xl cursor-default mx-auto ${
            order?.status == "delivered"
              ? "bg-purple-100 text-purple-700"
              : order?.status == "pending"
              ? "bg-yellow-100 text-yellow-600"
              : order?.status == "accepted"
              ? "bg-green-100 text-green-600"
              : ""
          }`}
        >
          {order?.status}
        </button>
      </td>
      <td className="text-center">
        {new Date(order?.createdAt).toLocaleDateString()}
      </td>
      <td className="text-center">
        <Modal
          header={
            <h2 className="text-lg mx-auto text-green-500 font-bold"></h2>
          }
          toggle={
            <button
              className={`px-5 py-1 bg-slate-400 text-white rounded-2xl text-center mx-auto hover:bg-slate-600`}
            >
              view
            </button>
          }
        >
          <SingleOrderCard data={order} />
        </Modal>
      </td>
    </tr>
  );
}
