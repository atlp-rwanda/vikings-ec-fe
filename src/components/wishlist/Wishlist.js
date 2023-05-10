import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../../features/wishlist/getWishlistSlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import getUserInfo from '../../utils/getUserInfo';
import WishCard from './WishCard';

const Wishlist = () => {
  const { data:allWish } = useSelector((state) => state.getWishlist);
  const {data:deleteWishlist} = useSelector((state) => state.deleteWishlist);

  const dispatch = useDispatch();

  const getWishedProduct = async (userId) => {
    try {
      const response = await dispatch(getWishList(userId)).unwrap();
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };
  useEffect(() => {
    const user = getUserInfo();
    getWishedProduct(user?.id);
  }, [deleteWishlist]);
  return (
    <>
    
      <h1 className="pb-8 text-center pt-8 font-bold text-[25px] text-gray-6000">Wished Products</h1>
          <div className="px-10 md:px-24 xl:px-60 xs:px-2 grid md:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1 gap-10">
            
            {allWish?.map((wish) => (
              <WishCard
                key={JSON.stringify(wish)}
                product={wish}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full px-4 pb-40">
       
      </div>

  </>
  );
};


export default Wishlist;
