import React, { useEffect, useState } from 'react';
import ProductRatings from './ProductRatings';
import getDiscount from '../../utils/getDiscount';

const ProductCard = ({ getPersistCartSetter, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const [persistCart, setPersistCart] = useState(false);
  useEffect(() => {
    if (getPersistCartSetter) {
      getPersistCartSetter((value) => {
        setPersistCart(value);
        if (value) setHovered(false);
      });
    }
  }, [getPersistCartSetter]);
  const singleProduct = () => {
    if (props.wish) {
      window.location.href = `/products/${props.product.id}`;
    } else {
      props.viewSingleProduct(
        props.product.name,
        props.product.images[0],
        props.product.price,
        props.product.quantity,
        props.product.id,
        props.product.bonus,
        props.product.isAvailable,
      );
    }
  };

  return (
    <div
      data-testid="product-card"
      className="flex-col border border-gray-100 shadow-sm relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}

    >
      {
        (props.product.bonus > 0) && (
          <div className="bg-red-500 text-white absolute top-6 left-6 w-fit p-2 text-[12px]">
            -
            {getDiscount(props.product.price, props.product.bonus)}
            {' '}
            %
          </div>
        )
      }
      <div className="h-[200px] md:h-[300px] overflow-y-clip">
        <img
          src={props.product.images[0]}
          alt="product"
          className="w-full object-cover cursor-pointer h-full"
          onClick={() => singleProduct()}
        />
        {(hovered || persistCart) && (
          <div className="absolute bottom-16 right-4">
            {props.wish}
            {props.addCart}
          </div>
        )}
        {hovered && (
        <div className="absolute bottom-16 right-4 flex gap-2 md:bottom-24">
          {props.editBTN}
          {props.deleteBTN}
        </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2">
        <p
          data-testid="product-name"
          className="text-indigo-900 text-[20px] mt-3 cursor-pointer hover:text-[#099f09] truncate"
          onClick={() => singleProduct()}
        >
          {props.product.name}
        </p>
        <div className="flex justify-between mt-2 items-center">
          <div className="text-[18px] text-[#099f09] font-bold truncate">
            {props.product.price}
            {' '}
            RWF
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
