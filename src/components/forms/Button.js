import React from 'react';
import propTypes from 'prop-types';

function Button({ label, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

Button.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
};

export default Button;
