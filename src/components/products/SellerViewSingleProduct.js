import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductRatings from './ProductRatings';
import loader from '../../../public/images/icons/loader.svg';
import { getProductRatings } from '../../features/product/getRatingsSlice';

const SellerViewSingleProduct = ({ ...props }) => {
  const dispatch = useDispatch();
  const { ratings, isLoading } = useSelector((state) => state.getRatings);
  useEffect(() => {
    dispatch(getProductRatings(props.product.id));
  }, [props.product.id]);
  return (
    <div className="flex gap-16">
      <div className="relative">
        <div className="">{props.switchImages}</div>
        <img
          src={props.product.image}
          alt="product"
          className="lg:max-w-[400px] lg:max-h-[300px] md:w-[350px] md:h-[250px] object-cover xs:max-w-[350px] sm:max-w-[350px] sm:max-h-[300px] xs:w-[99%]"
        />
        <div className="absolute flex md:bottom-8 xs:bottom-2 right-4 gap-6">
          {props.editBTN}
          {props.deleteBTN}
        </div>
      </div>
      <div>
        <p className=" text-black font-bold text-[18px]">Name</p>
        <p className="text-[#161616] text-[16px] font-medium">
          {props.product.name}
        </p>
        <p className=" text-black font-bold text-[18px]">Price</p>
        <p className="text-[#161616] text-[16px] font-medium">
          ${props.product.price}
        </p>
        <p className=" text-black font-bold  text-[20px]">Ratings</p>
        <div className="flex">
          {ratings ? (
            <ProductRatings rate={ratings} />
          ) : (
            <img
              src={loader}
              alt="Loader Spinner"
              className="text-green-500 animate-spin w-[25px] text-center"
              data-testid="spinner"
            />
          )}
        </div>
        <p className=" text-black font-bold  text-[20px]">Left in stock</p>
        <p className="text-[#161616] text-[16px] font-medium">
          {props.product.quantity}
        </p>
      </div>
    </div>
  );
};
export default SellerViewSingleProduct;
