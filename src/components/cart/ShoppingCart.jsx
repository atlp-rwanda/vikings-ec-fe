import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart } from '../../features/cart/cartSlice';

const ShoppingCart = () => {
  const [totalItems, setTotalItems] = React.useState(0);
  const { data } = useSelector((state) => state.cart);
  const { data: addToCart } = useSelector((state) => state.addToCart);
  const { data: removeFromCart } = useSelector((state) => state.removeFromCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [addToCart,removeFromCart]);
  React.useEffect(() => {
    if (data) {
      const itemsCount = data?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;
      setTotalItems(itemsCount);
    }
  } , [data]);
  return (
    <Link to="/cart" className="relative font-bold flext justify-start items-start">
      <span className="absolute top-0 -right-1 bg-[#7AC751] text-white text-xs  px-1 rounded-full">
        {totalItems}
      </span>
      <span className="material-symbols-outlined text-[#7AC751] text-2xl">
        shopping_bag
      </span>
    </Link>
  );
};

export default ShoppingCart;
