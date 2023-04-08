import React from 'react';
import { useSelector } from 'react-redux';

const SearchSuggest = ({ ...props }) => {
  const { productsList } = useSelector((state) => state.product);

  const sendProductName = (product) => {
    props.click(product);
  };
  const filteredProducts = productsList.rows.filter((product) =>
  product.name.toLowerCase().startsWith(props.productName.toLowerCase()),
);
  return (
    <div className="bg-gray-100  px-2 py-3 grid gap-1" data-testid="search-suggest">
      {filteredProducts.map((product) => (
        <p key={product.id} data-testid="click-name" onClick={() => sendProductName(product.name)} className="hover:bg-[#64B937] cursor-pointer px-1 py-1">{product.name}</p>
      ))}
    </div>
  );
};
export default SearchSuggest;