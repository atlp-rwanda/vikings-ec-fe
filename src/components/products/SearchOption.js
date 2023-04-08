import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';
import loader from '../../../public/images/icons/loader.svg';

const SearchOption = ({ ...props }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const categories = useSelector((state) => state.category.categories);
  const { status } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const setCategoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const setMinPriceHandler = (e) => {
    setMinPrice(e.target.value);
  };
  const setMaxPriceHandler = (e) => {
    setMaxPrice(e.target.value);
  };
  const setExpireDateHandler = (e) => {
    setExpireDate(e.target.value);
  };

  props.options({
    category, minPrice, maxPrice, expireDate,
  });

  return (
    <div className="bg-gray-100  px-2 py-3 grid gap-8 xs:w-56">
      <div className="flex">
        {status === 'loading' ? (
          <div className="flex justify-center mt-0 py-0 gap-2">
            <img src={loader} alt="Loader Spinner" className="text-green-500 animate-spin w-[30px] text-center" data-testid="spinner" />
            Categories
          </div>
        )
          : (
            <select onChange={setCategoryHandler} className="w-full px-2 py-2 outline-none border border-gray-200 hover:border hover:border-gray-300">
              <option>Select category</option>
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          ) }
      </div>
      <input type="text" placeholder="Minimum price" onChange={setMinPriceHandler} className="px-2 py-2 outline-none border border-gray-200 hover:border hover:border-gray-300" />
      <input type="text" placeholder="Maximum price " onChange={setMaxPriceHandler} className="px-2 py-2 outline-none border border-gray-200 hover:border-gray-300" />
      <div className="w-full">
        <label htmlFor="expire-date" className="text-[#959595] px-2">Expiration Date</label>
        <input type="date" name="expire-date" onChange={setExpireDateHandler} className="w-full px-2 py-2 outline-none border border-gray-200 hover:border-gray-300" />
      </div>
    </div>
  );
};
export default SearchOption;
