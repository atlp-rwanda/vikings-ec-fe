/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { provideRatings } from '../../features/ratings/ratingsSlice';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import Button from '../forms/Button';
import { ratingSchema } from '../../validations/inputValidation';
import Textarea from './Textarea';
import { getProductRatings } from '../../features/product/getRatingsSlice';
import loader from '../../../public/images/icons/loader.svg';


const Ratings = ({ visible, onClose, productId }) => {
  const { isLoading } = useSelector((state) => state.provideRatings);
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  const handleOnClose = (e) => {
    if(e.target.id === 'container')  onClose();

  }

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ratingSchema),
  });

  const onSubmit = async (reviewsData) => {

    try {
      reviewsData.rate=number
      const response = await dispatch(provideRatings({rate:reviewsData.rate, productId:productId, feedback:reviewsData.Feedback})).unwrap();
      dispatch(getProductRatings(productId));
      showSuccessMessage('Product rated successfully');
      onClose()
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };


  return (
    <form
      className={`fixed top-0 left-0 flex flex-col justify-center items-center px-4 w-full h-full bg-black bg-opacity-50 z-50 ${!visible ? 'hidden': ''}`}
    onSubmit={(event) => {
      handleSubmit(onSubmit)(event);
    }}

    >

      <div
      id="container"
      className={`max-w-2xl my-auto backdrop-blur-sm z-50 p-4  border border-grey-400 bg-slate-200 poppins w-full px-4 bg-opacity-80 `}>
        <h2>Provide Ratings and Feedback</h2>
        <div className="flex items-center">
          {Array(5)
            .fill()
            .map((_, index) => (
              number >= index + 1 || hoverStar >= index + 1 ? (
                <AiFillStar
                key={`${index}rate`}
                  onMouseOver={() => setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={{ color: 'orange' }}
                  onClick={() => setNumber(index + 1)}
                />
              ) : (
                <AiOutlineStar
                key={`${index}star`}
                  onMouseOver={() => setHoverStar(index + 1)}
                  onMouseLeave={() => hoverStar(undefined)}
                  style={{ color: 'orange' }}
                  onClick={() => setNumber(index + 1)}
                />
              )
            ))}
        </div>
       <div className='mt-5'>
        <Textarea
        id="feedback"
        rows='4'
        name="feedback"
        label="Feedback"
        placeholder="Provide your feedback"
        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-50'
        {...register('Feedback')}
        error={errors?.Feedback}
        />
        </div>
        <div className = 'py-3 sm:px-6 flex gap-2 flex-row-reverse'>
          {isLoading ? (
              <Button
            className="!w-fit text-white sm:ml-3 bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-20 font-bold rounded-none self-end ml-auto"
            parentClassName="flex xs:block"
            >
              <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" />
            </Button>
          ) : (
           <Button
            role="submit"
            type="submit"
            label="Add review"
            className="text-white sm:ml-3 bg-green-500 hover:bg-green-600 px-5 py-2.5 mt-20 font-bold rounded-none"
          />

          )}
          <Button
          role="cancel"
          type='button'
          onClick={onClose}
          label="cancel"
          className="text-white px-5 py-2.5 mt-20 font-bold rounded-none"
        />
        </div>




      </div>
  </form>
  );
};

export default Ratings;
