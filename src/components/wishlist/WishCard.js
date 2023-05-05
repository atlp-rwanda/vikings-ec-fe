/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';

const WishCard = ({ product }) => (
  <div className="flex-col border border-gray-100 shadow-sm relative">
    <div className="h-[200px] md:h-[300px] overflow-y-clip">
      <img
        src={product.images[0]}
        alt="product-image"
        className="w-full object-cover cursor-pointer h-full"
      />

    </div>
    <div className="flex justify-between items-center bg-white p-2">
      <div className=" sm:w-1/2 flex flex-col justify-between">
        <h1 className="">{product.name}</h1>
      </div>

      <div className="">
        <p className="text-center mb-2 font-bold text-xl">{product.price}</p>
      </div>
    </div>
  </div>

);

export default WishCard;
