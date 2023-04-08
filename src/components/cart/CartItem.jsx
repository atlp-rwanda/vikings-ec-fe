import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { removeFromCart } from '../../features/cart/removeProductFromCartSlice';
import Modal from '../Modal';
import SetCartQuantity from './SetCartQuantity';
import { addToCart } from '../../features/cart/addToCartSlice';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.cart);
  const {isLoading} = useSelector((state) => state.removeFromCart);
  const {isLoading: addToCartLoading} = useSelector((state) => state.addToCart);

  const deleteProduct = async () => {
    try {
      const response = await dispatch(removeFromCart({
        id: product.id,
      })).unwrap();
      showSuccessMessage(response?.message || 'Removed from cart successfully');
    }catch (error) {
      showErrorMessage(error?.data?.message || 'Something went wrong');
    }

  };
  const addByOne = async () => {
    const newQuantity = product.quantity + 1;
    try {
      await dispatch(addToCart({
        productId: product.id,
        productQuantity: newQuantity,
      })).unwrap();
    }catch (error) {
      showErrorMessage(error?.data?.message || 'Something went wrong');
    }

  }
  const reduceByOne = async () => {
    const newQuantity = product.quantity - 1;
  if(newQuantity <= 0) {
    showErrorMessage('You cannot reduce the quantity to zero');
    return;
  }
    try {
      await dispatch(addToCart({
        productId: product.id,
        productQuantity: newQuantity,
      })).unwrap();
    }catch (error) {
      showErrorMessage(error?.data?.error || 'Something went wrong');
    }

  }
  return (
    <div
      className="flex w-full max-w-lg p-4 min-h-[160px] items-center bg-[#F7F8FA] rounded-lg"
    >
      <div className="w-2/6 ">
        <img
          role="presentation"
          className="rounded-lg w-full"
          src={product.images[0] || 'https://picsum.photos/300'}
          alt="placeholder"
        />
      </div>
      <div className="w-4/6 px-3 h-full flex flex-col justify-around gap-2 ">
        <div className="flex gap-2 justify-between items-center">
          <h3 className="text-lg text-[#11142D]">{product.name}</h3>
          <p className="text-sm text-[#7AC751]">
            {product.price * product.quantity}
            &nbsp;RWF
          </p>
        </div>
        <div className="flex gap-3 justify-start items-center">
          <button type="button" onClick={reduceByOne} disabled={addToCartLoading} data-testid="decrease-cart-item"
                  className="material-symbols-outlined p-1 text-[20px] shadow-md rounded-lg text-[#7AC751] disabled:opacity-50 disabled:cursor-not-allowed">
            remove
          </button>
          <p className="text-[#757575]">QTY:</p>
          <input
            type="number"
            disabled
            className="max-w-[20px] no-arrows text-[#757575]"
            value={product.quantity}
          />
          <button type="button" onClick={addByOne} data-testid="increase-cart-item" disabled={addToCartLoading}
                  className="material-symbols-outlined p-1 text-[20px] shadow-md rounded-lg text-[#7AC751] disabled:opacity-50 disabled:cursor-not-allowed">
            add
          </button>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <p className="text-sm text-[#7AC751]">
            {product.price}
            &nbsp;RWF
          </p>
          <p className="text-[#757575]">/each</p>
        </div>
        <div className="flex justify-between">
          <Modal
            header={(
              <h2 className="text-2xl mx-auto text-[#64B937]">
                Edit quantity of &nbsp;
                {product.name}
                &nbsp; in your cart
              </h2>
            )}
            toggle={
          <button
            type="button"
            data-testid="edit-cart"
            className="bg-[#7AC751] border-2 text-white my-2 py-1 rounded-lg px-2 self-start"
          >
            Edit
          </button>}
            forceCloseOnChange={data}
            >
            <SetCartQuantity
              price={product.price}
              id={product.id}
              name={product.name}
              defaultQuantity={product.quantity}
            />
          </Modal>
          <button
            disabled={isLoading}
            type="button"
            onClick={deleteProduct}
            data-testid="remove-from-cart"
            className="text-[#7AC751] border-2 border-[#7AC751] my-2 py-1 rounded-lg px-2 self-start disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
};

export default CartItem;
