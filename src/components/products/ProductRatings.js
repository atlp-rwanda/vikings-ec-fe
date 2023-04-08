import React from 'react';
import star from '../../../public/images/star.svg';
import star1 from '../../../public/images/star1.svg';

const ProductRatings = ({ rate }) => {
  const ratingsRange = {
    one: 0, two: 0, three: 0, four: 0, five: 0,
  };
  for (let i = 0; i < rate.length; i++) {
    if (rate[i].rate === 1) {
      ratingsRange.one += 1;
    } else if (rate[i].rate === 2) {
      ratingsRange.two += 1;
    } else if (rate[i].rate === 3) {
      ratingsRange.three += 1;
    } else if (rate[i].rate === 4) {
      ratingsRange.four += 1;
    } else if (rate[i].rate === 5) {
      ratingsRange.five += 1;
    }
  }
  let totalUsers = 0;
  let totalRatings = 0;
  let count = 1;
  for (const key in ratingsRange) {
    totalUsers += ratingsRange[key];
    totalRatings += ratingsRange[key] * count;
    count++;
  }
  const averageRatings = Math.floor(totalRatings / totalUsers) || 0;
  return (
    <div className="flex">
      {[...Array(averageRatings)].map((_, index) => (
        <img key={index} src={star} alt="star" className="w-5 h-5" />
      ))}
      {[...Array(5 - averageRatings)].map((_, index) => (
        <img key={index} src={star1} alt="star" className="w-5 h-5" />
      ))}
    </div>
  );
};
export default ProductRatings;
