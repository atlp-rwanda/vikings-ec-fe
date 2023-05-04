import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductRatings from './ProductRatings';
import Reviewers from './Reviewers';
import loader from '../../../public/images/icons/loader.svg';
import { getProductRatings } from '../../features/product/getRatingsSlice';
import Button from '../forms/Button';
import Ratings from '../ratings/Ratings';

const BuyerViewProduct = ({ ...props }) => {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.getRatings);
  const [reviews, setReviews] = useState([]);
  const [isReviews, setIsReviews] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const handleOnClose = () => setShowRatings(false);

  useEffect(() => {
    if (props.products && props.products.id) {
      dispatch(getProductRatings(props.products.id));
    }
  }, [props.products && props.products.id]);

  useEffect(() => {
    if (Array.isArray(ratings) && ratings.length > 0) {
      const reviewers = ratings.map((rate) => ({
        buyer: rate.buyer,
        feedback: rate.feedback,
      }));
      setReviews(reviewers);
    }
  }, [ratings]);

  let reviewers = null;
  if (Array.isArray(ratings) && ratings.length > 0) {
    reviewers = reviews.map((r, index) => (
      <Reviewers key={index} reviewer={r} />
    ));
  }
  const fullIViewmage = props.products.images
    && <img src={props.products.images[props.fullImage]} alt="product" className="md:w-full object-center" />;
  const otherImages = props.products.images && props.products.images.map((image, i) => i !== props.fullImage
    && <img src={image} key={i} alt="product" className="w-24 h-20 mt-2 object-cover " />);
  return (
    <div>
      <div className="md:flex gap-24">
        <div className="relative h-[250px] overflow-y-clip md:w-[500px] md:h-[350px]">
          {fullIViewmage}
          <div className="absolute top-[44%] w-full">
            {props.switchImages}
          </div>
        </div>
        <div className="">
          <p className="text-black font-bold text-[20px] pb-2">{props.products.name}</p>
          <p className="text-[#464c55] text-[18px] font-bold pb-2">
            {props.products.price}
            {' '}
            RWF
          </p>
          <div className="">
            {ratings ? <ProductRatings rate={ratings} /> : <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[25px] text-center" data-testid="spinner" />}
            <div className="flex gap-4">
              {props.wish}
              {props.addCart}
            </div>
            <div className="flex justify-between h-fit overflow-clip items-center mt-7 gap-3">
              {otherImages}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] md:space-y-3">
        <p className="text-[#393d3e] pt-8 font-bold text-[18px] italic">Reviews</p>
        <div className="md:space-y-3">
          {reviewers || 'No reviews found'}
        </div>
        <div className="py-3 sm:px-6 sm:flex ">
          <p className="text-[#393d3e] pt-8 font-bold text-[18px] italic">Reviews</p>
          <Ratings onClose={handleOnClose} visible={showRatings} productId={props.products.id} />
          <Button
            onClick={() => setShowRatings(true)}
            label="Add review"
            parentClassName="flex"
            className="!w-fit text-white mx-[19rem] bg-green-500 hover:bg-green-600 px-5 py-2.5 font-bold rounded-none self-end xs:w-full"
          />
        </div>
        <div className="md:space-y-3">
          {reviewers || 'No reviews found'}
        </div>

      </div>
    </div>
  );
};

export default BuyerViewProduct;
