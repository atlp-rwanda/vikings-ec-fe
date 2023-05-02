import React, { useState } from 'react';

const ProductCard = ({ ...props }) => {
  const [hovered, setHovered] = useState(false);
  const singleProduct = () => {
    if (props.wish) {
      window.location = `/products/${props.product.id}`;
    } else {
      props.viewSingleProduct(
        props.product.name,
        props.product.images[0],

        props.product.price,
        props.product.quantity,

        props.product.id,
      );
    }
  };

  return (
    <div
      data-testid="product-card"
      className="flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}

    >
      <div className="">
        <img
          src={props.product.images[0]}
          alt="product"
          className="md:h-[270px] max-sm:h-[200px] w-full object-cover cursor-pointer"
          onClick={() => singleProduct()}
        />
        {hovered && (
          <div className="absolute xs:ml-80 xs:-mt-40 sm:ml-96 sm:-mt-44  md:ml-64 md:-mt-40">
            {props.wish}
            {props.addCart}
          </div>
        )}
        {hovered && (
        <div className="absolute pt-2 flex gap-4 mt-[-80px] ml-24">
          {props.editBTN}
          {props.deleteBTN}
        </div>
        )}
      </div>
      <div className="flex justify-between py-2items-center">
        <p
          data-testid="product-name"
          className="text-indigo-900 text-[20px] mt-3 cursor-pointer hover:text-[#099f09]"
          onClick={() => singleProduct()}
        >
          {props.product.name.length > 20 ? `${props.product.name.slice(0, 20)}...` : props.product.name}
        </p>
        <div className="flex justify-between mt-2 items-center">
          <div className="text-[18px] text-[#099f09] font-bold">
            $
            {props.product.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
