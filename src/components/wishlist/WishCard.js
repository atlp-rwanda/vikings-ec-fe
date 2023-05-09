/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import deleteIcon from '../../../public/images/Delete.png';
import { deleteWishlist } from '../../features/wishlist/deleteWishlistSlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import ProductOperationButton from '../products/ProductOperationButton';

const WishCard = ({ product }) => {
  const dispatch = useDispatch();

  const handledelete = async (productId) => {
    try {
      const response = await dispatch(deleteWishlist(productId)).unwrap();
      showSuccessMessage(response?.message);
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  return (
  <div className="flex-col border border-gray-100 shadow-sm relative">
    <div className="h-[200px] md:h-[300px] overflow-y-clip">
      <img
        src={product.images[0]}
        alt="product-image"
        className="w-full object-cover cursor-pointer h-full"
      /> 
    </div>
    <ProductOperationButton
              className="mt-[20px] bg-[rgb(253,25,25)] hover:bg-[#5f0d0d] h-[32px] w-[32px] rounded-full flex justify-center items-center"
              icon={deleteIcon}
              title="Delete product"
              onClick={() => handledelete(product.id)}
              alt="delete"
              size="w-[16px] h-[22px]"
            />
    <div className="flex justify-between items-center bg-white p-2">
      <div className=" sm:w-1/2 flex flex-col justify-between">
        <h1 className="">{product.name}</h1>
      </div>

      <div className="">
        <p className="text-center mb-2 font-bold text-xl">{product.price}</p>
      </div>
    </div>
  </div>
  )
};

export default WishCard;
