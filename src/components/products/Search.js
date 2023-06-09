import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import search from '../../assets/images/search.svg';
import option from '../../assets/images/option_arrow.svg';
import SearchOption from './SearchOption';
import SearchSuggest from './SearchSuggest';
import { getProductList } from '../../features/product/getProductsSilice';
import InformSearched from './InformSearched';
import { showErrorMessage } from '../../utils/toast';

const Search = () => {
  const dispatch = useDispatch();
  const { productsList, isLoading, errorMessage } = useSelector((state) => state.product);
  const [options, setOptions] = useState(false);
  const [searchSuggest, setSearchSuggest] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchedFor, setSearchedFor] = useState('');
  const { pathname } = useLocation();
  const isRootUrl = pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOptions(false);
        setSearchSuggest(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    if (errorMessage && isSearch) {
      showErrorMessage(errorMessage.data.error);
    }
  }, [errorMessage]);

  const optionHandler = () => {
    setOptions((prevSate) => !prevSate);
  };

  const searchInputHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value) {
      setOptions(false);
      setSearchSuggest(true);
      setSearchName(value);
    } else if (value === '' && isSearch) {
      dispatch(getProductList({ pageNumber: 1, name: '' }));
      setIsSearch(false);
    }
    if (value === '') {
      setSearchName('<');
    }
  };

  const closeSearchedInform = () => {
    setIsSearch(false);
    setInputValue('');
    dispatch(getProductList({ pageNumber: 1, name: '' }));
  };

  const searchProductNameClicked = (productName) => {
    setInputValue(productName);
    dispatch(getProductList({ pageNumber: 1, name: productName }));
    setSearchSuggest(false);
    setIsSearch(true);
    searchedInform(productName);
  };
  let selectedOptions = {};
  const getSelectedSearchOptions = (selectOptions) => {
    selectedOptions = { ...selectOptions };
  };
  const searchButtonHandler = () => {
    setOptions(false);
    if (inputValue !== '' || Object.values(selectedOptions).length > 0) {
      dispatch(getProductList({ pageNumber: 1, name: `${inputValue}`, ...selectedOptions }));
      setSearchSuggest(false);
      setIsSearch(true);
      searchedInform(inputValue);
    }
  };

  const searchedInform = (name) => {
    let searched = '';
    if (name) searched += `${name}, `;
    searched += selectedOptions.category ? `Cat: ${selectedOptions.category}, ` : '';
    searched += selectedOptions.minPrice ? `Min: ${selectedOptions.minPrice}RWF, ` : '';
    searched += selectedOptions.maxPrice ? `Max: ${selectedOptions.maxPrice}RWF, ` : '';
    searched += selectedOptions.expireDate ? `Exp: ${selectedOptions.expireDate}, ` : '';
    searched = searched.slice(0, -2);
    setSearchedFor(`You're searching for ${searched}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchButtonHandler();
    }
  };
  return (
    <div className={`relative w-full ${isRootUrl ? '' : 'hidden'}`} ref={searchRef}>
      <div className="bg-[#64B937] rounded-md px-0.5 py-0.5 flex">
        <input type="text" onChange={searchInputHandler} onKeyDown={handleKeyPress} value={inputValue} placeholder="Search here..." data-testid="search-input" className="rounded-l-md px-2 w-full outline-none py-1" />
        <div onClick={optionHandler} className="bg-[#fffdfd] border-l-2 cursor-pointer hover:bg-[#ebeeeb] px-3  py-1 flex justify-between items-center gap-3">
          <span className="xs:hidden">options</span>
          <img src={option} alt="options" />
        </div>
        <button type="button" disabled={isLoading} name="search" onClick={searchButtonHandler} className="bg-[#64B937] px-4 py-1">
          <img src={search} alt="search" />
        </button>
      </div>
      <div className="absolute z-50 w-full">
        {isSearch && !isLoading ? <InformSearched click={closeSearchedInform} message={`${searchedFor}`} /> : null }
        { options ? <SearchOption options={getSelectedSearchOptions} /> : null }
        { searchSuggest && !options ? (
          <SearchSuggest
            productName={searchName}
            click={searchProductNameClicked}
          />
        ) : null }
      </div>
    </div>
  );
};
export default Search;
