import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../forms/InputField';
import { addToCart } from '../../features/cart/addToCartSlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import createCartSchema from '../../validations/cartValidation';

const SetCartQuantity = ({
  quantity, price, id, name, defaultQuantity,
}) => {
  const { isLoading } = useSelector((state) => state.addToCart);
  const schema = createCartSchema(quantity);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (defaultQuantity) {
      reset({ quantity: defaultQuantity });
    }
  }, [defaultQuantity]);
  const productQuantity = watch('quantity');
  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        addToCart({ productId: id, productQuantity: data.quantity }),
      ).unwrap();
      showSuccessMessage(response?.payload?.message || 'Added to cart successfully');
      reset();
    } catch (e) {
      showErrorMessage(e?.data?.message || 'Something went wrong');
    }
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event);
      }}
      className="flex flex-col gap-6 px-24 py-12 items-start justify-center"
    >
      <div className="flex gap-2">
        <p className="text-[#757575]">Product Name</p>
        <p>{name}</p>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-[#757575]"> Quantity</span>
        <InputField
          min={0}
          parentClassName="flex justify-center items-center gap-2"
          placeholder="quantity"
          type="number"
          className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] focus:bg-[#EAF0F7] bg-[#EAF0F7]"
          {...register('quantity')}
          error={errors.quantity}
        />
        {
          quantity ? (
            <>
              <span className="text-[#757575]">MAX</span>
              <span>{quantity}</span>
            </>
          ) : null
        }

      </div>
      <div className="flex gap-2">
        <p className="text-[#757575]">Total price</p>
        <p>{price * (productQuantity > 0?productQuantity : 0) }</p>
      </div>
      <button
        disabled={isLoading}
        className=" self-center text-white bg-[#7AC751] py-2 px-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        Confirm
      </button>
    </form>
  );
};

export default SetCartQuantity;
