import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../features/cart/cartSlice';
import CheckoutDiv from '../../components/cart/CheckoutDiv';
import CartItemList from '../../components/cart/CartItemList';
import EmptyCart from '../../components/cart/EmptyCart';
 
const CartPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  const { data: cart } = useSelector((state) => state.cart);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1
        className="text-3xl text-[#7AC751] font-bold bg-[#F7F8FA] w-full py-4 text-center"
      >
        Cart
      </h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between w-full px-4 pb-40">
        {
          (cart?.products?.length || 0) !== 0 ? (
            <>
              <CartItemList items={cart?.products} />
              <CheckoutDiv />
          </>
          ) :
            <EmptyCart />
        }
      </div>

    </div>
  );
};

export default CartPage;
