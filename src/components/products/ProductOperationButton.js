import React from 'react';

const ProductOperationButton = ({ ...props }) => (
  <button
    data-testid={props.testId}
    onClick={props.onClick}
    className={props.className}
    type="button"
    title={props.title}
    onClick={props.onClick}
    onMouseEnter={props.handleMouseEnter}
    onMouseLeave={props.handleMouseLeave}
  >
    <img
      src={props.icon}
      alt={props.alt}
      className={props.size}
    />
  </button>
);
export default ProductOperationButton;
