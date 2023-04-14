import React from 'react';
import propTypes from 'prop-types';

const Button = (props) => (
  <div>
    <button type={props.type} role={props.role} onClick={props.onClick} disabled={props.disabled} className={` w-full my-2 h-[45px] rounded-md bg-[#338E03] py-2 px-3 text-sm font-semibold text-white hover:bg-[#64B937] ${props.className}`}>
      {props.label}
      {props.children }
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
