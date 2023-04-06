import React from "react";
import { SingleOrderProduct } from './SingleOrderProduct';

const SingleOrderCard = ({ data }) => {
  const order = data;
  return (
    <div className="w-full rounded-lg shadow-lg">
      <div
        className={` py-4 ${
          order?.status == "delivered"
            ? "bg-purple-700 text-purple-100"
            : order?.status == "pending"
            ? "bg-yellow-600 text-yellow-100"
            : order?.status == "accepted"
            ? "bg-green-600 text-green-100"
            : ""
        }`}
      >
        <h2 className="text-white font-bold text-center text-lg ">
          {order?.status == "pending"
            ? "your order is Pending"
            : order?.status == "delivered"
            ? "your order delivered"
            : order?.status == "accepted"
            ? "your order accepted"
            : ""
          }
        </h2>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-start">
          <p className="text-gray-800 text-left block">Total: &nbsp;</p>
          <br />
          <p className="font-bold text-gray-800 block">
            RWF {order?.fullPrice}
          </p>
          <p
            className={`font-bold text-right ml-auto px-3 py-1 rounded-2xl  ${
              order?.status == "delivered"
                ? "bg-purple-100 text-purple-700"
                : order?.status == "pending"
                ? "bg-yellow-100 text-yellow-600"
                : order?.status == "accepted"
                ? "bg-green-100 text-green-600"
                : ""
            }`}
          >
            {order?.status == "pending"
            ? "Pending"
            : order?.status == "delivered"
            ? "delivered"
            : order?.status == "accepted"
            ? "accepted"
            : ""
          }
          </p>
        </div>
        <p className="text-center text-gray-500 my-2">{new Date(order?.createdAt).toLocaleDateString()}</p>
        {
          order?.products.map((product)=>{
            return (
              <><hr className="my-2 border-gray-300 border-dashed" />
              <SingleOrderProduct product={product} />
              </>
            )
          })
        }
      </div>
    </div>
  );
};

export default SingleOrderCard;
