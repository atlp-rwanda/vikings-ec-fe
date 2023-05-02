import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const CartItemList = ({ items }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
    {
        items.map((product, i) => {
          const key = `cart-item-${i}${product.id}`;
          return <CartItem key={key} product={product} />;
        })
      }
  </div>
);
CartItemList.defaultProps = {
  items: [],
};
CartItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })),
};

export default CartItemList;
