import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductRatings from './ProductRatings';
import Reviewers from './Reviewers';
import loader from '../../../public/images/icons/loader.svg';
import { getProductRatings } from '../../features/product/getRatingsSlice';

const BuyerViewProduct = ({ ...props }) => {
  const dispatch = useDispatch();
  const { ratings, isLoading } = useSelector((state) => state.getRatings);
  const [reviews, setReviews] = useState([]);

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
  const fullIViewmage = props.products.images && (
    <img
      src={props.products.images[props.fullImage]}
      alt="product"
      className="xs:w-full lg:w-full sm:w-full xs:ml-[-16px] md:w-full md:h-[250px] object-cover"
    />
  );
  const otherImages =
    props.products.images &&
    props.products.images.map(
      (image, i) =>
        i !== props.fullImage && (
          <img src={image} key={i} alt="product" className="w-24 h-20 mt-2" />
        )
    );
  return (
    <div>
      <div className="md:flex lg:flex flex-wrap md:flex-nowrap w-[100%] mt-24 md:gap-10 lg:gap-4">
        <div className="md:w-[900px] xs:w-[108%] lg:w-1/2 sm:ml-[-13px] xs:ml-[0px] px-4 ">
          {fullIViewmage}
          <div className="md:mt-[-190px]">{props.switchImages}</div>
        </div>
        <div className="w-full md:w-1/1">
          <p className="text-black font-bold text-[20px] pb-2">
            {props.products.name}
          </p>
          <p className="text-[#464c55] text-[18px] font-bold pb-2">
            ${props.products.price}
          </p>
          <div className="space-y-[-10px]">
            {ratings ? (
              <ProductRatings rate={ratings} />
            ) : (
              <img
                src={loader}
                alt="Loader Spinner"
                className="text-green-500 animate-spin w-[25px] text-center"
                data-testid="spinner"
              />
            )}
            <div className="flex space-x-[25px] pb-[40px]">
              {props.wish}
              {props.addCart}
            </div>
            <div className="lg:flex lg:gap-3 md:flex md:gap-3 pb-2 grid sm:grid-cols-3 xs:grid-cols-3 sm:space-y-2 xs:space-y-2">
              {otherImages}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] md:space-y-3">
        <p className="text-[#393d3e] pt-8 font-bold text-[18px] italic">
          Reviews
        </p>
        <div className="md:space-y-3">{reviewers || 'No reviews found'}</div>
      </div>
    </div>
  );
};

export default BuyerViewProduct;