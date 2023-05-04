import React from 'react';

const Order = ({ ...props }) => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-2">
      <div className="w-36">
        <img
          role="presentation"
          className="rounded-lg w-full"
          src={props.image}
          alt="placeholder"
        />
      </div>
      <div className="text-[#262727] text-[16px]">
        <p className="font-semibold">Name:</p>
        <p>{props.productName}</p>
        <p className="font-semibold">Price:</p>
        <p>
          {props.price}
          RWF
        </p>
        <p>
          <span className="font-semibold">QTY:</span>
          {' '}
          {props.quantity}
        </p>
      </div>
    </div>
  </div>
);
export default Order;