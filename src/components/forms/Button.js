import React from 'react';
import propTypes from 'prop-types';

const Button = ({ parentClassName, ...props }) => (
  <div className={parentClassName}>
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={` w-full my-2 h-[45px] rounded-md bg-[#338E03] py-2 px-3 text-sm font-semibold text-white hover:bg-[#64B937] ${props.className}`}
      role={props.role}
    >
      {props.label} {props.children}
    </button>
  </div>
);
Button.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
};
Button.defaultProps = {
  label: '',
  onClick() {},
};
export default Button;
