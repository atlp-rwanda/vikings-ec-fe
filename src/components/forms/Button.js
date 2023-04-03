import React from 'react';
import propTypes from 'prop-types';

function Button({ label, onClick, className }) {
  return (
    <div>
      <button onClick={onClick} className={className} type="submit">
        {label}
      </button>
    </div>
  );
}

Button.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
  className: propTypes.string,
};
Button.defaultProps = {
  label: '',
  onClick() {},
  className: '',
};
export default Button;
