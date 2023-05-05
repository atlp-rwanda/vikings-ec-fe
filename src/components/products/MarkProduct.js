import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markProduct } from '../../features/product/markProductSlice';
import loader from '../../../public/images/icons/loader.svg';
import { getProductList } from '../../features/product/getProductsSilice';

const MarkProduct = ({ productId, isAvailable }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.markProduct);
  let available = null;
  const [isChecked, setIsChecked] = useState(isAvailable);
  useEffect(() => {
    setIsChecked(isAvailable);
  }, [productId]);
  const handleCheckboxChange = async() => {
    if (isAvailable) {
      available = 'false';
    } else {
      available = 'true';
    }
    await dispatch(markProduct({ productId, body: { isAvailable: available } }));
    dispatch(getProductList({ pageNumber: 1 }));
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-[#e2e3e2] hover:bg-[#099f09] rounded-md p-1 mt-2 cursor-pointer">
      <label className="flex items-center gap-2 text-black font-bold  text-[18px] cursor-pointer">
        {!isLoading ? (
          <input
            className="h-5 w-5 rounded-md cursor-pointer"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        ) : (
          <div className="flex justify-center mt-0 py-0">
            <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[20px] text-center" data-testid="spinner" />
          </div>
        )}
        Available
      </label>
    </div>
  );
};


export default MarkProduct;
