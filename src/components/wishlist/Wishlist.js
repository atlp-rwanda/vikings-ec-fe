import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import WishCard from './WishCard';
import { getWishList } from '../../features/wishlist/getWishlistSlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

const Wishlist = () => {
  const [allWish, setAllWish] = useState([]);
  const dispatch = useDispatch();

  const getWishedProduct = async (userId) => {
    try {
      const response = await dispatch(getWishList( userId)).unwrap();
      setAllWish(response);
      showSuccessMessage('Product added on Wishilist successfully');
    } catch (error) {
      showErrorMessage('error.data.message');
    }
  };
  useEffect(() => {
    
    getWishedProduct();
  }, []);
  return (
    <div>
      <p>tdfyghijhgyftdtxrsxdtfghj</p>
    </div>
  );
};

export default Wishlist;
