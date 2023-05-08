import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductRatings from './ProductRatings';
import loader from '../../../public/images/icons/loader.svg';
import { getProductRatings } from '../../features/product/getRatingsSlice';
import MarkProduct from './MarkProduct';

const SellerViewSingleProduct = ({ ...props }) => {
  const dispatch = useDispatch();
  const { ratings, isLoading } = useSelector((state) => state.getRatings);
  useEffect(() => {
    dispatch(getProductRatings(props.product.id));
  }, [props.product.id]);
  return (
    <div className="flex gap-16 xs:flex-col">
      <div className="relative h-[250px] overflow-y-clip md:w-[500px] md:h-[350px]">
        <div>
          {props.switchImages}
        </div>
        <img src={props.product.image} alt="product" className="w-full" />
        <div className="absolute flex md:bottom-8 xs:bottom-2 right-4 gap-6">
          {props.editBTN}
          {props.deleteBTN}
        </div>
      </div>
      <div>
        <div className="xs:flex items-center">
          <p className=" text-black font-bold text-[18px] xs:w-2/4">Name</p>
          <p className="text-[#161616] text-[16px] font-medium">{props.product.name}</p>
        </div>
        <div className="xs:flex items-center">
          <p className=" text-black font-bold text-[18px] xs:w-2/4">Price</p>
          <p className="text-[#161616] text-[16px] font-medium">
            {props.product.price}
            {' '}
            RWF
          </p>
        </div>
        <div className="xs:flex items-center">
          <p className=" text-black font-bold  text-[18px] xs:w-2/4">Ratings</p>
          <div className="flex">
            {ratings ? <ProductRatings rate={ratings} /> : <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[25px] text-center" data-testid="spinner" />}
          </div>
        </div>
        <div className="xs:flex items-center">
          <p className=" text-black font-bold  text-[18px] xs:w-2/4">Left in stock</p>
          <p className="text-[#161616] text-[16px] font-medium">{props.product.quantity}</p>
        </div>
        <MarkProduct productId={props.product.id} isAvailable={props.product.isAvailable}/>
      </div>
    </div>
  );
};
export default SellerViewSingleProduct;